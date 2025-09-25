import { Link } from "react-router-dom";

export default function UserVideoCard({ title, description, views, likes, thumbnail, upload, videoId, isPublished, onTogglePublish, onDelete, }) {
    return (
        <div className="w-full flex items-center justify-between bg-gray-900 rounded-xl p-4 mb-4 shadow-lg ">
            <Link to={`/api/v1/video/get/${videoId}`} className="flex-shrink-0">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-40 h-24 object-cover rounded-md"
                />
            </Link>

            <div className="flex flex-col flex-grow px-4 text-white">
                <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>
                <p className="text-sm text-gray-400 line-clamp-2">{description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                    <span>{views} views</span>
                    <span>|</span>
                    <span> {likes} likes </span>
                    <span>|</span>
                    <span>{upload}</span>
                </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
                <button
                    onClick={() => onTogglePublish(videoId)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${isPublished
                            ? "bg-green-600 hover:bg-green-500"
                            : "bg-yellow-600 hover:bg-yellow-500"
                        }`}
                >
                    {isPublished ? "Unpublish" : "Publish"}
                </button>

                <button
                    onClick={() => onDelete(videoId)}
                    className="px-3 py-1 rounded-md text-sm font-medium bg-red-600 hover:bg-red-500"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}