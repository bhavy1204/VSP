import React from 'react'
import { useNavigate } from 'react-router-dom';

const PlaylistContainer = ({ onRemove, playlists, user }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="p-4">
                {playlists?.length > 0 ? (
                    playlists.map((playlist) => (
                        <div
                            key={playlist._id}
                            onClick={() => { navigate(`playlist/${playlist._id}`)}}
                            className="mx-4 my-3 flex items-center justify-between bg-gray-900 rounded-xl p-4 mb-4 shadow-lg cursor-pointer hover:bg-gray-800 transition"
                        >
                            {/* Thumbnail of first video */}
                            <div className="flex-shrink-0">
                                <img
                                    src={
                                        playlist.videos?.[0]?.thumbnail ||
                                        "/default-thumbnail.jpg"
                                    }
                                    alt={playlist.name}
                                    className="w-40 h-24 object-cover rounded-md"
                                />
                            </div>

                            {/* Playlist Info */}
                            <div className="flex flex-col flex-grow px-4 text-white">
                                <h2 className="text-lg font-semibold line-clamp-2">
                                    {playlist.name}
                                </h2>
                                <p className="text-sm text-gray-400 line-clamp-2">
                                    {playlist.description || "No description available."}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                                    <span>{playlist.videos?.length || 0} videos</span>
                                    <span>|</span>
                                    <span>
                                        {new Date(playlist.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 items-end">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(playlist._id);
                                    }}
                                    className="px-3 py-1 rounded-md text-sm font-medium bg-red-600 hover:bg-red-500 text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center mt-6">
                        No playlists found.
                    </p>
                )}
            </div>
        </>
    )
}

export default PlaylistContainer