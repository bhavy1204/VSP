import React from 'react'
import MyLikedPostCard from './MyLikedPostCard'
import { formatDistanceToNow } from 'date-fns'

const MyLikedPostContainer = ({onRemove,postList}) => {
    return (
        <div className="h-full">
            <div className="flex flex-col h-full">
                {postList.length > 0 ? (
                    postList.map((p) => (
                        <MyLikedPostCard
                            key={p._id}
                            postId= {p._id}
                            creator={p.creator}
                            content={p.content}
                            upload={formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })}
                            onRemove={onRemove}
                        />
                    ))) : (
                    <h1 className='text-gray-400 text-4xl mx-auto'>Wow so Empty</h1>
                )}
            </div>
        </div>
    )
}

export default MyLikedPostContainer