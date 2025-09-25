import React from "react";
import UserTweetCard from "./UserTweetCard"; // new card design
import { formatDistanceToNow } from "date-fns";

export default function UserTweetsGrid({ tweets, onDelete, onEdit }) {
  return (
    <div className="grid grid-cols-1 gap-6 mx-2">
      {tweets && tweets.length > 0 ? (
        tweets.map((t) => (
          <UserTweetCard
            key={t._id}
            tweetId={t._id}
            content={t.content}
            creator={t.creator}
            createdAt={formatDistanceToNow(new Date(t.createdAt), {
              addSuffix: true,
            })}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      ) : (
        <UserTweetCard
          key={1}
          tweetId={1}
          content="This is sample content for my post"
          creator="Creator"
          createdAt="N/A"
          onDelete={() => {}}
          onEdit={() => {}}
        />
      )}
    </div>
  );
}
