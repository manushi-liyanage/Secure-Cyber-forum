import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function Home({ user }) {
  const navigate = useNavigate();
  const [latestPosts, setLatestPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/posts?limit=5&sort=desc")
      .then((res) => setLatestPosts(res.data))
      .catch((err) => console.error("Failed to fetch recent posts:", err));
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      navigate(`/posts?q=${encodeURIComponent(searchText.trim())}`);
    }
  };

  const isLoggedIn = !!user?.userId;

  return (
    <section className="bg-gray dark:bg-gray-900">
      
      {/* Search Bar */}
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="lg:col-span-7 mb-6">
          <div className="relative flex items-center bg-gray dark:bg-gray-900 border border-gray-500 pl-7 pr-7 pb-3 pt-3 rounded-2xl w-4/5 min-w-fit">
            <Search />
            <input
              type="text"
              placeholder="Search News and blogs per your need.."
              className="bg-gray dark:bg-gray-900 w-full pl-3 font-thin text-gray-400"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:grid-cols-12 lg:py-16">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Stay Updated <br /> Stay Connected
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Empowering cybersecurity awareness through collaboration, knowledge sharing, and real-time updates — stay informed, stay secure, stay ahead of cyber threats.
          </p>

          {/* Explore News */}
          <a
            href="/posts"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Explore News
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          {/* Conditional Button */}
          {isLoggedIn ? (
            <button
              onClick={() => navigate("/create-post")}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-green-600 border border-green-600 rounded-lg hover:bg-green-700"
            >
              Add a New Post
            </button>
          ) : (
            <a
              href="/SignUp"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
            >
              Join us Now
            </a>
          )}
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          {/* Image Placeholder */}
        </div>
      </div>

      {/* Recent Posts Carousel */}
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Recent Posts</h2>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {latestPosts.map((post) => (
            <SwiperSlide key={post._id}>
              <div className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{post.title}</h3>
                {post.visualContent && post.visualContentType === "image" && (
                  <img src={post.visualContent} alt="preview" className="h-40 w-full object-cover rounded mb-2" />
                )}
                <p className="text-sm text-gray-500 mb-2">
                  {post.description?.slice(0, 100)}...
                </p>
                <button
                  onClick={() => navigate(`/posts/${post._id}`)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Read more →
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
