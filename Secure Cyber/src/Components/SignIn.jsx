
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// export default function SignIn(){
//     const navigate = useNavigate();
    
//     return(
//         <div className='full-page'>
//         <div className='main-section'>
//             <div className='image-section'>
//               <img src='src/images/SignUP2.jpg' alt='signInimage' className='signupImage' ></img>
//             </div>
//             <div className='form-section'>
//             <h1 className='SignUP'>Sign In</h1>
//             <form className='signup-form'>
//                 <div >
//                    <label htmlFor='' className='label-signUp'>Enter Email address</label>
//                     <input type='email' placeholder='Enter Email' className='signinEmail' required></input>
                    
//                 </div>
//                 <div >
//                     <label htmlFor='' className='label-signUp'>Enter Password</label>
//                     <input  id="password-input"type='password' placeholder=' Enter Password' required></input>
                   
//                 </div>
               
//                 <div className='check-main'>
//                 <div className='checkbox-remember'>
//                     <input type='checkbox' id='rememberMe'className='signinCheckbox'/>
//                     <label htmlFor='rememberMe' className='remember-label'>Remember Me</label>
//                 </div>
//                 <div className='forgot-label'>
//                     <p>
//                         forgot your password? <a href="#"></a>
//                     </p>
//                 </div>
//                 </div>
//                 <div>
//                     <button type='submit' id='submit'onClick={() => navigate('#')}>Sign In</button>
//                 </div>
                
//             </form>
//             <div className='divider'>Or , Login with</div>
//             <button type='button' id='google'><img src="/src/images/google.png" alt='google-image'></img>Continue with Google</button>
//             <p className='account'>Don't have an account? <Link to="/signup">Register</Link></p>
            
//             </div>
            
               

//         </div>
//         </div>
//     )
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config"; // Import API URL

export default function SignIn({ setUser }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Login successful!");
                localStorage.setItem("token", data.token); // Store token
                setUser(data.user); // Set user state
                navigate("/"); // Redirect after login
            } else {
                setMessage(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Server error. Please try again.");
        }
    };

    return (
        // <div className="full-page">
        //     <div className="main-section">
        //         <div className="image-section">
        //             <img src="/src/images/SignUP2.jpg" alt="signInimage" className="signupImage" />
        //         </div>
        //         <div className="form-section">
        //             <h1 className="SignUP">Sign In</h1>
        //             <form className="signup-form" onSubmit={handleSubmit}>
        //                 <div>
        //                     <label className="label-signUp">Enter Email address</label>
        //                     <input type="email" name="email" placeholder="Enter Email" className="signinEmail" required onChange={handleChange} />
        //                 </div>
        //                 <div>
        //                     <label className="label-signUp">Enter Password</label>
        //                     <input type="password" name="password" placeholder="Enter Password" id="password-input" required onChange={handleChange} />
        //                 </div>

        //                 <div className="check-main">
        //                     <div className="checkbox-remember">
        //                         <input type="checkbox" id="rememberMe" className="signinCheckbox" />
        //                         <label htmlFor="rememberMe" className="remember-label">Remember Me</label>
        //                     </div>
        //                     <div className="forgot-label">
        //                         <p>
        //                              <a href="#">Forgot your password?</a>
        //                         </p>                            </div>
        //                 </div>

        //                 <div>
        //                     <button type="submit" id="submit">Sign In</button>
        //                 </div>

        //                 {message && <p>{message}</p>}

        //             </form>
        //             <div className="divider">Or, Login with</div>
        //             <button type="button" id="google">
        //                 <img src="/src/images/google.png" alt="google-image" /> Continue with Google
        //             </button>
        //             <p className="account">Don't have an account? <Link to="/signup">Register</Link></p>
        //         </div>
        //     </div>
        // </div>
        <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="flex flex-row bg-white rounded-xl shadow-lg overflow-hidden w-11/12 max-w-4xl">
  
          {/* Left Image Section */}
          <div className="hidden md:flex flex-1 justify-center items-center ">
            <img
              src="/src/images/SignUP2.jpg"
              alt="Signup"
              className="w-full h-full object-contain rounded-md"
            />
          </div>
  
          {/* Right Form Section */}
          <div className="flex-1 p-8 flex flex-col justify-center items-center">
  
            <h2 className="mb-4 text-black font-extrabold text-2xl md:text-3xl">Sign In</h2>
            
            <input
              type="email"
              placeholder="Email"
              className="w-[95%] p-3 border border-gray-300 rounded-md text-base mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
  
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md text-base mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
  
            <div className="flex justify-between items-center mb-4 w-full">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2 w-4 h-4 scale-110 cursor-pointer" />
                <label className="text-sm font-normal pt-1">Remember me</label>
              </div>
  
              <a href="#" className="text-sm text-gray-600 hover:underline pt-1">
                Forgot password?
              </a>
            </div>
  
            <button
              id="submit"
              className="w-full p-3 text-white bg-black rounded-md text-base hover:bg-yellow-400 hover:text-black transition duration-300"
            >
              Sign Up
            </button>
  
            <div className="mt-3 mb-2 text-center text-sm text-gray-500">or</div>
  
            <button
              id="google"
              className="flex justify-center items-center w-full p-3 border border-gray-400 text-gray-500 rounded-md text-base hover:bg-yellow-400 hover:text-gray-800 transition duration-300"
            >
              <img
                src="/src/images/google.png"
                alt="google"
                className="w-5 h-5 mr-3"
              />
              Continue with Google
            </button>
  
            {/* <p className="text-sm text-gray-700 mt-4">
              Already have an account?{" "}
              <a href="/signup" className="text-purple-700 hover:underline" >
                Sign In
              </a>
            </p> */}
  
          </div>
        </div>
      </div>
    );
}

