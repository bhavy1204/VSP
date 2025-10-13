import React, { useState, useEffect } from "react";
import api from "../../../axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../../features/authSlice";
import PlaylistContainer from "./playlistContainer";

const Playlist = () => {
  const dispatch = useDispatch();
  const [playlists, setPlaylists] = useState([]);
  const { user, status } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [playlistData, setPlaylistData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      if (!user?.data?._id) return;

      try {
        const userId = user.data._id;
        const res = await api.get(`/v1/playlist/u/getplaylist/${userId}`);
        setPlaylists(res.data.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchUserPlaylists();
  }, [user]);

  const removePlaylistFromState = async (playlistId) => {
    try {
      await api.delete(`/v1/playlist/p/delete/${playlistId}`);
      toast.success("Playlist deleted successfully!");
      setPlaylists((prev) => prev.filter((p) => p._id !== playlistId));
    } catch (error) {
      console.error(error);
      toast.error("Error deleting playlist");
    }
  };

  const createPlaylist = async (e) => {
    e.preventDefault();

    if (!playlistData.name.trim()) {
      toast.error("Playlist name is required!");
      return;
    }

    try {
      const res = await api.post(`/v1/playlist/create`, {
        name: playlistData.name,
        description: playlistData.description,
      });

      setPlaylists((prev) => [...prev, res.data.data]);
      toast.success("Playlist created successfully!");
      setShowModal(false);
      setPlaylistData({ name: "", description: "" });
    } catch (error) {
      console.error(error);
      toast.error("Error creating playlist");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-800 text-white py-3 px-4">
        <h1 className="text-3xl font-bold">Your Playlists</h1>
        <button
          className="bg-blue-600 hover:bg-blue-500 rounded-lg text-sm px-4 py-2 transition-all duration-200"
          onClick={() => setShowModal(true)}
        >
          + Create Playlist
        </button>
      </div>

      <PlaylistContainer
        playlists={playlists}
        onRemove={removePlaylistFromState}
        user={user}
      />

      {/* 🔥 Modal for Creating Playlist */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-6 w-[90%] sm:w-[400px]">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
              Create New Playlist
            </h2>

            <form onSubmit={createPlaylist} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Playlist Name
                </label>
                <input
                  type="text"
                  value={playlistData.name}
                  onChange={(e) =>
                    setPlaylistData({ ...playlistData, name: e.target.value })
                  }
                  placeholder="Enter playlist name"
                  className="w-full px-3 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Description
                </label>
                <textarea
                  value={playlistData.description}
                  onChange={(e) =>
                    setPlaylistData({
                      ...playlistData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your playlist..."
                  className="w-full px-3 py-2 bg-gray-800 rounded-md text-white resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Playlist;
