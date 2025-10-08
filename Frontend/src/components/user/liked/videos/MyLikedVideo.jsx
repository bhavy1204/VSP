import React from 'react'
import MyLikedVideoContainer from './MyLikedVideoContainer'
import { useState, useEffect } from 'react';
import api from '../../../../axios';
import toast from 'react-hot-toast';

const MyLikedVideo = () => {

    const [videos, updateVideos] = useState([]);

    useEffect(() => {
        const fetchLikedVideos = async () => {
            // const user = JSON.parse(localStorage.getItem("user"));
            const res = await api.get("/v1/like/videos");
            console.log("LIKE DATA >> ", res)
            updateVideos(res.data.data)
        };
        fetchLikedVideos();
    }, []);

    const removeVideoFromState = async (videoId) => {
        try {
            const res = await api.post(`/v1/like/toggle/v/${videoId}`)
            // console.log("This is subscribe toogle res --- ", res);
            toast.success("liked removed successfully")
        } catch (error) {
            console.log(error);
            alert("Some error", error);
        }
        updateVideos((prev) => prev.filter((v) => v._id !== videoId));
    };

    return (
        <>
            <h1 className="text-white text-3xl mx-2 my-1 border-b-1 pb-2">Your Liked Videos</h1>
            <MyLikedVideoContainer videoList={videos} onRemove={removeVideoFromState} />
        </>
    )
}

export default MyLikedVideo