import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import "./Styles/SignIn.css";
import "./Styles/SignUp.css";
import SignIn from "./Components/SignIn";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import PostList from "./Components/PostList";
import PostDetails from "./Components/PostDetails";
import CreatePost from "./Components/CreatePost";
import EditPost from "./Components/EditPost";
import PrivateRoute from "./Components/PrivateRoute";
import MyPosts from "./Components/MyPosts";

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/signIn" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route
          path="/create-post"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/edit/:id"
          element={
            <PrivateRoute>
              <EditPost />
            </PrivateRoute>
          }
        />
        <Route path="/my-posts" element={<MyPosts />}>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
