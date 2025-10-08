import React from 'react'
import api from '../../../../axios';

const MyLikedPostCard = ({creator,content,upload,onRemove,postId}) => {

    const handleRemoveVideo = async (postId) => {
        onRemove(postId);
    }


    return (
        <div className="mx-4 my-2 flex items-center justify-between bg-gray-900 rounded-xl p-4 mb-4 shadow-lg">

            <div className="flex flex-col flex-grow px-4 text-white">
                <h2 className="text-lg font-semibold line-clamp-2">{creator}</h2>
                <p className="text-sm text-gray-400 line-clamp-2">{content}</p>

                <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                    <span>{upload}</span>
                </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
                <button
                    onClick={() => handleRemoveVideo(postId)}
                    className="px-3 py-1 rounded-md text-sm font-medium bg-red-600 hover:bg-red-500 text-white"
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default MyLikedPostCard