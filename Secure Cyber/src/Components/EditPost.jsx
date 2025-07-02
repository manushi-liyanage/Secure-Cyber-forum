import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5050/api/posts";

export default function EditPost() {
  const { id } = useParams();
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

  // Fetch the post to edit
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setMessage("Failed to load post.");
      }
    };

    fetchPost();
  }, [id]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.patch(`${API_BASE}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setMessage("Post updated successfully!");
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error("Update error:", err);
      setMessage("Failed to update post.");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      navigate("/posts");
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("Failed to delete post.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
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

        {/* Optionally preview uploaded image/video */}
        {formData.visualContent && (
          formData.visualContentType === "image" ? (
            <img src={formData.visualContent} alt="Preview" className="mt-2 max-h-40 object-contain" />
          ) : (
            <video src={formData.visualContent} controls className="mt-2 max-h-40" />
          )
        )}

        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

















// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const API_BASE = "http://localhost:5050/api/posts";

// export default function EditPost() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     companyEmail: "",
//     description: "",
//     company: "",
//     category: "",
//     visualContent: "",
//     visualContentType: "",
//   });

//   const [message, setMessage] = useState("");

//   // Fetch the post to edit
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/${id}`);
//         setFormData(res.data);
//       } catch (err) {
//         console.error("Error fetching post:", err);
//         setMessage("Failed to load post.");
//       }
//     };

//     fetchPost();
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");

//       await axios.patch(`${API_BASE}/${id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });

//       setMessage("Post updated successfully!");
//       navigate(`/posts/${id}`);
//     } catch (err) {
//       console.error("Update error:", err);
//       setMessage("Failed to update post.");
//     }
//   };

//   const handleDelete = async () => {
//     const confirm = window.confirm("Are you sure you want to delete this post?");
//     if (!confirm) return;

//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(`${API_BASE}/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });

//       navigate("/posts");
//     } catch (err) {
//       console.error("Delete error:", err);
//       setMessage("Failed to delete post.");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
//       {message && <p className="mb-4 text-red-500">{message}</p>}
//       <form onSubmit={handleUpdate} className="space-y-4">
//         <input name="title" onChange={handleChange} value={formData.title} placeholder="Title" className="w-full p-2 border rounded" required />
//         <input name="companyEmail" onChange={handleChange} value={formData.companyEmail} placeholder="Company Email" className="w-full p-2 border rounded" required />
//         <input name="company" onChange={handleChange} value={formData.company} placeholder="Company Name" className="w-full p-2 border rounded" />
//         <input name="category" onChange={handleChange} value={formData.Category} placeholder="Category" className="w-full p-2 border rounded" />
//         <textarea name="description" onChange={handleChange} value={formData.description} placeholder="Description" className="w-full p-2 border rounded" rows="4" />
//         <input name="visualContent" onChange={handleChange} value={formData.visualContent} placeholder="Visual Content" className="w-full p-2 border rounded" />
//         <input name="visualContentType" onChange={handleChange} value={formData.visualContentType} placeholder="Visual Content Type" className="w-full p-2 border rounded" />

//         <div className="flex space-x-4 mt-4">
//           <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600">Update</button>
//           <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
//         </div>
//       </form>
//     </div>
//   );
// }
