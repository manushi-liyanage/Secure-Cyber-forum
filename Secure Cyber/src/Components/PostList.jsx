import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5050/api/posts";
const POSTS_PER_PAGE = 6;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PostList() {
  const query = useQuery();
  const searchQuery = query.get("q") || "";

  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterText, setFilterText] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(API_BASE)
      .then((res) => {
        setPosts(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setError("Failed to fetch posts. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const search = filterText.toLowerCase();
    const result = posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(search) ||
        post.company?.toLowerCase().includes(search) ||
        post.category?.toLowerCase().includes(search) ||
        post.userId?.email?.toLowerCase().includes(search)
    );
    setFiltered(result);
    setCurrentPage(1); // reset to first page on filter change
  }, [filterText, posts]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (loading)
    return (
      <div className="bg-gray dark:bg-gray-900 min-h-screen p-6">
        <p className="text-center text-gray-700 dark:text-gray-300">Loading posts...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-gray dark:bg-gray-900 min-h-screen p-6">
        <p className="text-center text-red-600 dark:text-red-400 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="bg-gray dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
          All Posts
        </h2>

        {/* Filter input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title, company, category, or email..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full sm:w-96 p-3 border border-gray-300 rounded-md shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No posts match your filter.
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {paginated.map((post) => (
                <div
                  key={post._id}
                  className="p-6 border border-gray-200 rounded-lg shadow-sm
                             hover:shadow-lg transition-shadow duration-300
                             dark:bg-gray-800 dark:border-gray-700"
                >
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Status: <span className="font-medium">{post.status || "N/A"}</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Company: <span className="font-medium">{post.company || "N/A"}</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Category: <span className="font-medium">{post.category || "N/A"}</span>
                  </p>
                  <p className="mt-3 text-gray-700 dark:text-gray-300">
                    {post.description || "No description provided."}
                  </p>
                  <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                    By: {post.userId?.email || "Unknown"}
                  </p>

                  {post.visualContentType === "image" && post.visualContent && (
                    <img
                      src={post.visualContent}
                      alt={`Image for ${post.title}`}
                      className="mt-4 max-h-40 w-full object-contain rounded-md"
                    />
                  )}

                  <Link
                    to={`/posts/${post._id}`}
                    className="inline-block mt-4 text-blue-600 hover:text-blue-800 underline"
                  >
                    View Post →
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-8 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`px-4 py-2 rounded-md font-semibold
                    ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}






// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const API_BASE = "http://localhost:5050/api/posts";

// export default function PostList() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     axios.get(API_BASE)
//       .then((res) => setPosts(res.data))
//       .catch((err) => console.error("Failed to fetch posts:", err));
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">All Posts</h2>
//       <div className="space-y-4">
//         {posts.map((post) => (
//           <div key={post._id} className="p-4 border rounded shadow">
//             <h3 className="text-xl font-semibold">{post.title}</h3>
//             <p>Status: {post.status}</p>
//             <p className="text-gray-700">{post.description}</p>
//             <p className="text-sm text-gray-400 mt-1">By: {post.userId?.email}</p>
//             <Link to={`/posts/${post._id}`} className="text-blue-500 underline">View Post</Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
