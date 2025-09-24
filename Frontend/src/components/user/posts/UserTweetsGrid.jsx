import React, { useEffect, useState } from 'react'
import TweetCard from '../../Home/Tweets/Tweetcard';
import api from '../../../axios';
import { useSelector } from "react-redux";
import { updateTweet } from '../../../../../src/controllers/tweet.controller';
import { formatDistanceToNow } from "date-fns";

const UserTweetsGrid = () => {
 
    const user = useSelector((state) => state.auth.user);

    const [tweets, setTweets] = useState();

    useEffect(() => {
        if (!user?.data?._id) return;
        const fetchMyTweets = async () => {
            try {
                console.log("User for comments ", user)
                const res = await api.get(`/v1/tweet/u/${user?.data?._id}`);
                console.log(res.data);
                setTweets(res.data.data);
            } catch (error) {
                console.log("Comment fetch error >> ", error)
                alert(error);
            }
        };
        fetchMyTweets();
    }, [user]);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 ">
                {tweets ? (
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

export default UserTweetsGrid