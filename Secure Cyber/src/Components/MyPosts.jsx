import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5050/api/posts";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("📦 Token from localStorage:", token);
        if (!token) {
          throw new Error("No token found");
        }

        const res = await axios.get(`${API_BASE}/my-posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch user's posts:", err);
      }
    };

    fetchMyPosts();
  }, []);

  return (
    <div className="bg-gray dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">My Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No posts found.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Status: {post.status || "N/A"}</p>
                <Link
                  to={`/posts/${post._id}`}
                  className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-600"
                >
                  View Post
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
