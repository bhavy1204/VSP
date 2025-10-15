export default function EmptyState({ message = "Wow, so empty!" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 rounded-xl p-8 shadow-lg ">
        <svg
          className="w-16 h-16 mb-4 text-white "
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
        <p className="text-white text-xl font-semibold text-center">{message}</p>
        <p className="mt-2 text-gray-300 text-sm text-center">Nothing here yet…</p>
      </div>
    </div>
  );
}
