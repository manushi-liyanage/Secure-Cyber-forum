import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5050/api/posts";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user")); // Logged-in user

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${id}`);
        console.log("Fetched post data:", res.data);
        setPost(res.data);
      } catch (err) {
        setError("Failed to load post.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${API_BASE}/${id}`);
      navigate("/posts");
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Delete failed. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="bg-gray dark:bg-gray-900 min-h-screen p-6 flex items-center justify-center">
        <p className="text-gray-700 dark:text-gray-300">Loading post...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-gray dark:bg-gray-900 min-h-screen p-6 flex items-center justify-center">
        <p className="text-red-500 dark:text-red-400 font-semibold">{error}</p>
      </div>
    );

  if (!post)
    return (
      <div className="bg-gray dark:bg-gray-900 min-h-screen p-6 flex items-center justify-center">
        <p className="text-gray-700 dark:text-gray-300">Post not found.</p>
      </div>
    );

  // Extract postUserId safely as a string
  const postUserId =
    post.userId && typeof post.userId === "object"
      ? post.userId._id?.toString()
      : post.userId?.toString();

  // Fix here: use currentUser.userId, not currentUser._id
  const currentUserId = currentUser?.userId?.toString();

  const isOwner = currentUserId && postUserId && currentUserId === postUserId;

  return (
    <div className="bg-gray dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-2xl mx-auto border rounded shadow bg-white dark:bg-gray-800 p-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{post.title}</h2>
        <p className="mb-1 text-gray-700 dark:text-gray-300">
          <strong>Status:</strong> {post.status || "N/A"}
        </p>
        <p className="mb-1 text-gray-700 dark:text-gray-300">
          <strong>Company:</strong> {post.company || "N/A"}
        </p>
        <p className="mb-1 text-gray-700 dark:text-gray-300">
          <strong>Company Email:</strong> {post.companyEmail || "N/A"}
        </p>
        <p className="mb-1 text-gray-700 dark:text-gray-300">
          <strong>Category:</strong> {post.category || "N/A"}
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">{post.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Posted by: {post.userId?.email || "Unknown"}
        </p>

        {post.visualContent && post.visualContentType === "image" && (
          <img
            src={post.visualContent}
            alt="Visual content"
            className="mb-4 max-h-80 w-full object-contain rounded"
          />
        )}

        {post.visualContent && post.visualContentType === "video" && (
          <video controls src={post.visualContent} className="mb-4 max-h-80 w-full rounded" />
        )}

        <div className="flex space-x-4">
          {isOwner && (
            <>
              <Link
                to={`/posts/edit/${post._id}`}
                className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )}
          <Link
            to="/posts"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
