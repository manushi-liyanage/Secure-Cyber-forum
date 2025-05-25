import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import API_BASE_URL from "../config";

export default function SignUP(){

const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "", 
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
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Registration successful! Check your email for verification.");
            } else {
                setMessage(data.message || "Error registering user");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setMessage("Server error. Please try again.");
        }
    };
    return(
        
        <div className="flex justify-center items-center h-screen bg-black">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden w-11/12 max-w-4xl h-[80vh]">
        
        <div className="md:w-1/2 hidden md:flex justify-center items-center">
          <img src="src/images/SignUP2.jpg" alt="signup" className="object-contain w-full h-full" />
        </div>

        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-black mb-6 text-center">Sign Up</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            <div>
              <label className="text-gray-600 text-sm">Enter Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm">Enter Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm">Enter Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <button
              type="submit"
              id="submit"
              className="w-full py-2 bg-black text-white rounded hover:bg-yellow-400 hover:text-black transition"
            >
              Register
            </button>

            {message && <p className="text-center text-sm text-red-500 mt-2">{message}</p>}
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/signIn" className="text-purple underline">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
    )
}

