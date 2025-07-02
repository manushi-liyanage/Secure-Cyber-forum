import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    navigate("/signIn");
  };

  return (
    <nav className="flex justify-between items-center pb-3 pt-3 pl-5 pr-5 bg-gray-100 dark:bg-gray-900 shadow-md">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
        Secure Cyber Forum
      </h1>

      {/* Hamburger Icon */}
      <div className="lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          <Menu className="text-gray-500 w-6 h-6" />
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex space-x-6">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <Link to="/about" className="text-gray-500 hover:text-gray-700">About Us</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/signIn" className="text-gray-500 hover:text-gray-700">Login</Link>
            <Link to="/signup" className="text-gray-500 hover:text-gray-700">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="text-gray-500 hover:text-gray-700">Profile</Link>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-500"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-16 right-5 bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg p-4 space-y-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link
          to="/"
          className="block text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="block text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          About Us
        </Link>

        {!isLoggedIn ? (
          <>
            <Link
              to="/signIn"
              className="block text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              className="block text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block text-gray-500 hover:text-red-500"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu } from "lucide-react";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   //check login state on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!token);
//   })

//   return (
//     <nav className="flex justify-between items-center pb-3 pt-3 pl-5 pr-5 bg-gray dark:bg-gray-900 shadow-md">
//       <h6 className="m-0 text-gray-500">Secure Cyber Forum</h6>

//       {/* Hamburger Icon - Visible on Small Screens */}
//       <div className="lg:hidden">
//         <button onClick={() => setIsOpen(!isOpen)}>
//           <Menu className="text-gray-500 w-6 h-6" />
//         </button>
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden lg:flex space-x-6">
//         <Link to="/" className="text-gray-500 hover:text-gray-500">Home</Link>
//         <Link to="/about" className="text-gray-500 hover:text-gray-500">About Us</Link>
//         <Link to="/signIn" className="text-gray-500 hover:text-gray-500">Login</Link>
//         <Link to="/signup" className="text-gray-500 hover:text-gray-500">Sign Up</Link>
//       </div>

//       {/* Mobile Menu - Toggle Visibility */}
//       <div className={`lg:hidden absolute top-16 right-5 bg-gray dark:bg-gray-900 shadow-md rounded-lg p-4 space-y-4 ${isOpen ? "block" : "hidden"}`}>
//         <Link to="/" className="block text-gray-500 hover:text-gray-500" onClick={() => setIsOpen(false)}>Home</Link>
//         <Link to="/about" className="block text-gray-500 hover:text-gray-500" onClick={() => setIsOpen(false)}>About Us</Link>
//         <Link to="/signIn" className="block text-gray-500 hover:text-gray-500" onClick={() => setIsOpen(false)}>Login</Link>
//         <Link to="/signup" className="block text-gray-500 hover:text-gray-500" onClick={() => setIsOpen(false)}>Sign Up</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
