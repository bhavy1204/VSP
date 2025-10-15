import { useNavigate } from "react-router-dom";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white px-4">
      {/* Main icon or illustration */}
      <div className="mb-8">
        <svg
          className="w-32 h-32 text-blue-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Main message */}
      <h1 className="text-4xl font-bold mb-2">Coming Soon</h1>
      <p className="text-gray-300 text-center max-w-md mb-6">
        We are working hard to bring this feature to you. Stay tuned for updates!
      </p>

      {/* Optional animated dots */}
      <div className="flex space-x-5 mb-6">
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-500"></span>
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)} // goes back to previous page
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Go Back
      </button>
    </div>
  );
}
