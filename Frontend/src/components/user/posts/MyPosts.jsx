import React from 'react'
import UserCardGrid from "../Videos/UserCardGrid.jsx";
import { useVideos } from "../VideoProvider.jsx";
import { useEffect } from "react";
import api from "../../../axios.js";
import TweetCard from '../../Home/Tweets/Tweetcard.jsx';
import UserTweetsGrid from './UserTweetsGrid.jsx';


export default function MyPosts() {
    return (
        <>
            <UserTweetsGrid />
        </>
    )
}
