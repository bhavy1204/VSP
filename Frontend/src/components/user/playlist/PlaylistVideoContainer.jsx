import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../../features/authSlice";
import api from "../../../axios";
import { toast } from "react-hot-toast";

const PlaylistVideoContainer = () => {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        const res = await api.get(`/v1/playlist/getplaylist/${playlistId}`);
        setPlaylist(res.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load playlist");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylistVideos();
  }, [playlistId]);

  const removeVideoFromPlaylist = async (videoId) => {
    try {
      await api.patch(`/v1/playlist/p/removeVideo/${playlistId}/${videoId}`);
      setPlaylist((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v._id !== videoId),
      }));
      toast.success("Video removed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error removing video");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-300">
        Loading playlist...
      </div>
    );

  if (!playlist)
    return (
      <div className="text-center text-gray-400 mt-6">
        No playlist data found.
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-start py-6 px-3">
      <div className="w-full bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800 p-6 sm:p-8">
        {/* Playlist Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-1">
              {playlist.name || "Untitled Playlist"}
            </h1>
            <p className="text-gray-400 text-sm italic">
              {playlist.description || "No description provided."}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              {playlist.videos.length} video{playlist.videos.length !== 1 && "s"}
            </p>
          </div>
          <span className="text-gray-500 text-xs mt-4 sm:mt-0">
            Created on {new Date(playlist.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Videos List */}
        <div className="space-y-4">
          {playlist.videos?.length > 0 ? (
            playlist.videos.map((video) => (
              <div
                key={video._id}
                className="flex items-center justify-between bg-gray-800/60 rounded-xl p-4 shadow-lg hover:bg-gray-800/90 transition-all duration-200 border border-gray-700"
              >
                <Link to={`/video/${video._id}`} className="flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-40 h-24 object-cover rounded-md hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="flex flex-col flex-grow px-4 text-white">
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {video.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                    <span>{video.views} views</span>
                    <span>|</span>
                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <button
                    onClick={() => removeVideoFromPlaylist(video._id)}
                    className="px-3 py-1 rounded-md text-sm font-medium bg-red-600 hover:bg-red-500 text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center mt-6">
              No videos in this playlist yet.
            </p>
          )}
        </div>
      </div>
    </div>

  );
};

export default PlaylistVideoContainer;
