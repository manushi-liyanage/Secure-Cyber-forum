import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5050/api/posts";

export default function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    companyEmail: "",
    description: "",
    company: "",
    category: "",
    visualContent: "",
    visualContentType: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64String = reader.result;
      const fileType = file.type.startsWith("image") ? "image" : "video";

      setFormData((prev) => ({
        ...prev,
        visualContent: base64String,
        visualContentType: fileType,
      }));
    };

    reader.onerror = (error) => {
      console.error("File read error:", error);
      setMessage("Failed to read file.");
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post(API_BASE, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setMessage("Post submitted successfully!");
      navigate("/posts");
    } catch (err) {
      console.error("Error creating post:", err);
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Error creating post");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          onChange={handleChange}
          value={formData.title}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="companyEmail"
          onChange={handleChange}
          value={formData.companyEmail}
          placeholder="Company Email"
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="company"
          onChange={handleChange}
          value={formData.company}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Company</option>
          <option value="BOC">BOC</option>
          <option value="People's Bank">People's Bank</option>
          <option value="NSB">NSB</option>
          <option value="HNB">HNB</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="category"
          onChange={handleChange}
          value={formData.category}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          name="description"
          onChange={handleChange}
          value={formData.description}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows="4"
          required
        />

        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileUpload}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
