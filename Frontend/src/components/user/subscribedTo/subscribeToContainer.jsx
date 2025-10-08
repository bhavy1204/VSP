import React from 'react'
import SubscribeToCard from './subscribeToCard'

const SubscribeToContainer = ({ channelList, onUnsubscribe }) => {
  return (
    <>
      <div className="h-full">
        <div className="flex flex-col h-full">
          {channelList.length > 0 ? (
            channelList.map((c) => (
              <SubscribeToCard
                key={c._id}
                channelId={c._id}
                username={c.username}
                pfp={c.coverImage}
                subscribers={c.subscriberCount}
                onUnsubscribe={onUnsubscribe}
              />
            ))) : (
            <h1 className='text-gray-400 text-4xl mx-auto'>You have not subscribed to any channel yet</h1>
          )}
        </div>
      </div>
    </>
  )
}

export default SubscribeToContainer