import TweetCard from "./Tweetcard"
import { useOutletContext } from "react-router-dom"
import { formatDistanceToNow } from "date-fns";

export default function TweetsGrid() {
    const {tweets}= useOutletContext();
    console.log("tweets reached ",tweets)
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 ">
                {tweets.length > 0 ? (
                    tweets.map((t) => (
                        <TweetCard
                            key={t._id}
                            tweetId={t._id}
                            content={t.content}
                            creator={t.creator}
                            createdAt={formatDistanceToNow(new Date(t.createdAt), { addSuffix: true })}
                        />
                    ))) : (
                    <TweetCard
                        key={1}
                        tweetId={1}
                        content={"This is sample content for my post "}
                        creator={"Creator"}
                        createdAt={"n/A"}
                    />
                )}
            </div>
        </>
    )
}