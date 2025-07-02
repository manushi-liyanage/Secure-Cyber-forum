const User = require("../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
 
//Register User
exports.register = async (req , res) =>{
  try{
    const {name , email , password} = req.body;

    let user = await User.findOne({email});
    if (user) return res.status(400).json({message : "Email already in use"});

    
    //hash password
    const hashedPassword = await bcrypt.hash(password , 10);

    //create a verification token
    const verifyToken = jwt.sign({email} , process.env.JWT_SECRET , { expiresIn: "7d" });

    // save new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      verifyToken,
    });
    await user.save();

    //send verification email
    //const verifyLink = `${process.env.CLIENT_URL}/verify/${verifyToken}`;
    //const verifyLink = `http://localhost:5050/api/auth/verify/${verifyToken}`;
    const verifyLink = `${process.env.BACKEND_URL}/api/auth/verify/${verifyToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `<h3>Click the link to verify your email:</h3><a href="${verifyLink}">${verifyLink}</a>`,
    });

    res.status(201).json({ message: "User registered. Check your email for verification." });

  }catch(err){
    res.status(500).json({ message: "Server Error" });
  }

};

// Verify Email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("Received Token:", token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Find the user with this token
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    // Check if the user is already verified
    if (user.isVerified) {
        return res.status(400).json({ message: "User already verified" });
    }

    // Check if the stored verifyToken matches the one in the URL
    if (user.verifyToken !== token) {
        return res.status(400).json({ message: "Invalid token" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verifyToken = null; // Remove token after verification
    await user.save();

   // res.json({ message: "Email verified successfully!" });
   return res.redirect(`${process.env.CLIENT_URL}/`);

} catch (error) {
    console.error("Verification Error:", error.message);
    res.status(400).json({ message: "Invalid or expired token" });
}
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isVerified) return res.status(400).json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { userId: user._id, name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

