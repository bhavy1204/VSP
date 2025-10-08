import React from 'react'
// import MyLikedVideoContainer from './MyLikedVideoContainer'
import { useState, useEffect } from 'react';
import api from '../../../../axios';
import toast from 'react-hot-toast';
import MyLikedPostContainer from './MyLikedPostContainer'

const MyLikedPost = () => {

    const [posts, updatePosts] = useState([]);

    useEffect(() => {
        const fetchLikedPosts = async () => {
            // const user = JSON.parse(localStorage.getItem("user"));
            const res = await api.get("/v1/like/tweets");
            console.log("LIKE DATA >> ", res)
            updatePosts(res.data.data)
        };
        fetchLikedPosts();
    }, []);

    const removeVideoFromState = async (postId) => {
        try {
            const res = await api.post(`/v1/like/toggle/t/${postId}`)
            // console.log("This is subscribe toogle res --- ", res);
            toast.success("liked removed successfully")
        } catch (error) {
            console.log(error);
            alert("Some error", error);
        }
        updatePosts((prev) => prev.filter((p) => p._id !== postId));
    };


    return (
        <>
            <h1 className="text-white text-3xl mx-2 my-1 border-b-1 pb-2">Your Liked Posts</h1>
            <MyLikedPostContainer postList={posts} onRemove={removeVideoFromState} />
        </>
    )
}

export default MyLikedPost

