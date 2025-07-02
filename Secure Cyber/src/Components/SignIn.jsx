import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

export default function SignIn({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Store user in localStorage
        setUser(data.user); // Set app-level user
        navigate("/");
      } else {
        setMessage(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="flex flex-row bg-white rounded-xl shadow-lg overflow-hidden w-11/12 max-w-4xl">
        {/* Left Image */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <img
            src="/src/images/SignUP2.jpg"
            alt="Sign In"
            className="w-full h-full object-contain rounded-md"
          />
        </div>

        {/* Right Form */}
        <div className="flex-1 p-8 flex flex-col justify-center items-center">
          <h2 className="mb-4 text-black font-extrabold text-2xl md:text-3xl">
            Sign In
          </h2>

          {message && (
            <div className="mb-4 text-sm text-red-600 text-center">{message}</div>
          )}

          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-md text-base mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-md text-base mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center text-sm font-normal">
                <input type="checkbox" className="mr-2 w-4 h-4" />
                Remember me
              </label>
              <a href="#" className="text-sm text-gray-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-md text-base transition duration-300 ${
                loading
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-black text-white hover:bg-yellow-400 hover:text-black"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="mt-4 mb-2 text-center text-sm text-gray-500">or</div>

            <button
              type="button"
              id="google"
              className="flex justify-center items-center w-full p-3 border border-gray-400 text-gray-500 rounded-md text-base hover:bg-yellow-400 hover:text-gray-800 transition duration-300"
            >
              <img
                src="/src/images/google.png"
                alt="Google"
                className="w-5 h-5 mr-3"
              />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import API_BASE_URL from "../config"; // Import API URL

// export default function SignIn({ setUser }) {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const response = await fetch(`${API_BASE_URL}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Login successful!");
//         localStorage.setItem("token", data.token); // Store token
//         setUser(data.user); // Set user state
//         navigate("/"); // Redirect after login
//       } else {
//         setMessage(data.message || "Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setMessage("Server error. Please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-black">
//       <div className="flex flex-row bg-white rounded-xl shadow-lg overflow-hidden w-11/12 max-w-4xl">
//         {/* Left Image Section */}
//         <div className="hidden md:flex flex-1 justify-center items-center ">
//           <img
//             src="/src/images/SignUP2.jpg"
//             alt="Signup"
//             className="w-full h-full object-contain rounded-md"
//           />
//         </div>

//         {/* Right Form Section */}
//         <div className="flex-1 p-8 flex flex-col justify-center items-center">
//           <h2 className="mb-4 text-black font-extrabold text-2xl md:text-3xl">
//             Sign In
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-[95%] p-3 border border-gray-300 rounded-md text-base mb-4 focus:outline-none focus:ring-2 focus:ring-black"
//             />

//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full p-3 border border-gray-300 rounded-md text-base mb-4 focus:outline-none focus:ring-2 focus:ring-black"
//             />

//             <div className="flex justify-between items-center mb-4 w-full">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2 w-4 h-4 scale-110 cursor-pointer"
//                 />
//                 <label className="text-sm font-normal pt-1">Remember me</label>
//               </div>

//               <a
//                 href="#"
//                 className="text-sm text-gray-600 hover:underline pt-1"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             <button
//               type="submit"
//               id="submit"
//               className="w-full p-3 text-white bg-black rounded-md text-base hover:bg-yellow-400 hover:text-black transition duration-300"
//             >
//               Sign In
//             </button>

//             <div className="mt-3 mb-2 text-center text-sm text-gray-500">
//               or
//             </div>

//             <button
//               id="google"
//               className="flex justify-center items-center w-full p-3 border border-gray-400 text-gray-500 rounded-md text-base hover:bg-yellow-400 hover:text-gray-800 transition duration-300"
//             >
//               <img
//                 src="/src/images/google.png"
//                 alt="google"
//                 className="w-5 h-5 mr-3"
//               />
//               Continue with Google
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
