import React from "react";

export default function UserTweetCard({
    tweetId,
    content,
    creator,
    createdAt,
    id
}) {

    const onEdit = async () => {

    }

    const onDelete = async () => {
        try {
            const res = api.post(`v1/comment/c/${id}`);
            console.log("comment delete res >> ",res)
        } catch (error) {

        }
    }

    return (
        <div className="w-full flex items-start justify-between bg-gray-900 rounded-xl p-4 mb-4 shadow-lg hover:bg-gray-800 transition">
            {/* Left + Middle: Tweet content */}
            <div className="flex flex-col flex-grow pr-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-white">{creator}</span>
                    <span className="text-sm text-gray-400">{createdAt}</span>
                </div>

                <p className="text-gray-200 text-base leading-relaxed">{content}</p>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col gap-2 items-end">
                <button
                    onClick={onEdit}
                    className="px-3 py-1 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-500"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="px-3 py-1 rounded-md text-sm font-medium bg-red-600 hover:bg-red-500"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
