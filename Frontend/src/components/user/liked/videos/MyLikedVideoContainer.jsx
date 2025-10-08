import React from 'react'
import MyLikedVideoCard from './MyLikedVideoCard'
import { formatDistanceToNow } from 'date-fns'

const MyLikedVideoContainer = ({onRemove,videoList}) => {
  return (
    <div className="h-full">
            <div className="flex flex-col h-full">
                {videoList.length > 0 ? (
                    videoList.map((v) => (
                        <MyLikedVideoCard
                            key={v._id}
                            videoId={v._id}
                            title={v.title}
                            thumbnail={v.thumbnail}
                            views={v.views}
                            upload={formatDistanceToNow(new Date(v.createdAt), { addSuffix: true })}
                            onRemove={onRemove}
                        />
                    ))) : (
                    <h1 className='text-gray-400 text-4xl mx-auto'>Wow so Empty</h1>
                )}
            </div>
        </div>
  )
}

export default MyLikedVideoContainer