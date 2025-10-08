import React from 'react'

const SubscribeToCard = ({ channelId, username, pfp, subscribers, onUnsubscribe}) => {

  const handleUnsubscribe = () => {
    onUnsubscribe(channelId);
  }

  return (
    <div className="mx-4 my-2 flex items-center justify-between bg-gray-900 rounded-xl p-4 mb-4 shadow-lg hover:bg-gray-800 transition-colors">
      {/* Channel Image */}
      <div className="flex items-center gap-4">
        <img
          src={pfp}
          alt={username}
          className="w-14 h-14 object-cover rounded-full border border-gray-700"
        />

        {/* Channel Info */}
        <div className="text-white">
          <h2 className="text-lg font-semibold">{username}</h2>
          <p className="text-sm text-gray-400">{subscribers} subscribers</p>
        </div>
      </div>

      {/* Unsubscribe Button */}
      <button
        onClick={() => handleUnsubscribe(channelId)}
        className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-500 text-white transition"
      >
        Unsubscribe
      </button>
    </div>
  )
}

export default SubscribeToCard