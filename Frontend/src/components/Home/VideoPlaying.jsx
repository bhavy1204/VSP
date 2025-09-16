import { useState } from "react";
import Navbar from "./Navbar";
import VerticalVideoCard from "./Videos/VerticalVideoCard.jsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { ThumbsUp, ThumbsDown, Share2, MessageCircle, DownloadIcon } from "lucide-react";
import CommentsContainer from "./CommentsContainer";
import axios from "axios";
import api from "../../axios.js";

export default function VideoPlaying({ desc, user }) {
    const { videoId } = useParams();

    // side side video variables
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subscribed, setSubscribed] = useState(false);

    // video data var
    const [mainVideoData, setMainVideoData] = useState();

    // comments variable
    const [comment, setComment] = useState([]);

    // Likes
    const [likes, setLikes] = useState();
    const [isLiked, setIsLiked] = useState();

    // For video data
    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/video/get/${videoId}`, { withCredentials: true });
                console.log("this is calling teh video res :---", res);
                setMainVideoData(res.data.data.result);
                setLikes(res.data.data.like);
                setIsLiked(res.data.data.isLiked);
                { console.log("Main video data :--- ", mainVideoData) }
            } catch (error) {
                console.log(error);
                alert("Error while showing video data")
            } finally {
                setLoading(false);
            }
        }
        fetchVideoData()
    }, []);

    // For comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/comment/v/${videoId}`, { withCredentials: true });
                console.log(res);
                setComment(res.data.data);
            } catch (error) {
                console.log(error);
                alert("Error while displaying comments")
            } finally {
                setLoading(false);
            }
        }
        fetchComments()
    }, [videoId]);

    // For side bar videos
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/video/get/all`, { withCredentials: true });
                console.log(res);
                setVideos(res.data.data);
            } catch (error) {
                console.log(error);
                alert("Error while displaying comments")
            } finally {
                setLoading(false);
            }
        }
        fetchVideos()
    }, [comment]);

    // For subscribe toggle
    const handleSubscribe = async () => {
        try {
            const res = await api.post(`/v1/subscription/toggleSubscribe/${mainVideoData?.owner?._id}`)
            if (res.data.message === "subscribed") {
                setSubscribed(true);
            } else {
                setSubscribed(false);
            }
            console.log("This is subscribe toogle res --- ", res);
        } catch (error) {
            console.log(error);
            alert("Some error", error);
        }
    }

    // For cchecking isSubscribed when the page load
    useEffect(() => {
        const checkStatus = async () => {
            if (!mainVideoData?.owner?._id)
                return;
            try {
                const res = await api.get(`/v1/subscription/status/${mainVideoData?.owner?._id}`);
                console.log("THIS IS RES FROM EFFECT >> ", res)
                setSubscribed(res.data.data.isSubscribed)
            } catch (error) {
                console.log(error);
            }
        }
        checkStatus();
    }, [mainVideoData?.owner?._id])

    // like Toggle 
    const handleLikeToggle = async () => {
        try {
            const res = await api.post(`/v1/like/toggle/v/${mainVideoData?._id}`);
            console.log("LIKE KA RES ",res);
            setIsLiked(res.data.data.isLiked);
            setLikes(res.data.data.likesCount);
        } catch (error) {
            console.log("Like Error :: ", error)
        }
    }

    return (
        <>
            <Navbar />
            <div className="main flex h-screen">
                <div className="video flex-1 w-3/4 pb-12 pt-6 px-6 overflow-y-auto no-scrollbar bg-gray-900">
                    <video src={mainVideoData?.videoFile || "https://res.cloudinary.com/dr2tagfk8/video/upload/v1756791160/istockphoto-1253263447-640_adpp_is_ziugl4.mp4"}
                        controls
                        className="w-full mb-4"
                    >
                    </video>
                    <div className="interact flex justify-between px-4 items-center text-gray-300 overflow-x-auto no-scrollbar ">
                        <div className="channel flex gap-6 items-center">
                            <div className=" flex items-center  py-1.5 text-lg gap-2">
                                <img src={mainVideoData?.owner?.avatar} alt="" className="h-10 w-10 border rounded-full" />
                                <p>{mainVideoData?.owner?.username}</p>
                            </div>
                            <div className="toggle ">
                                <button className="bg-gray-600 py-2 px-4 rounded-2xl " onClick={handleSubscribe}>{subscribed ? "subscribed" : "subscribe"}</button>
                            </div>
                            <div className="like flex bg-gray-600 py-2 px-4 rounded-2xl gap-4">
                                <div className="flex items-center gap-1 border-r-1 pr-2" onClick={handleLikeToggle}>
                                    <ThumbsUp className={`${isLiked? "text-red-600" : "text-white"}`} />
                                    <p>{likes}</p>
                                </div>
                                {/* <div className="flex flex-col">
                                    <ThumbsDown />
                                </div> */}
                            </div>
                        </div>
                        <div className=" flex gap-2">
                            <div className="share flex gap-2 bg-gray-600 py-2 px-4 rounded-2xl ">
                                <Share2 />
                                Share
                            </div>
                            <div className="comments flex gap-2 bg-gray-600 py-2 px-4 rounded-2xl ">
                                <MessageCircle />
                                Comments
                            </div>
                            <div className="download flex gap-2 bg-gray-600 py-2 px-4 rounded-2xl ">
                                <DownloadIcon />
                                Download
                            </div>
                        </div>
                    </div>
                    <div className="description bg-gray-900 text-gray-500 px-4">
                        <p>{mainVideoData?.description}</p>
                    </div>
                    <div className="comments my-4 p-2 rounded-2xl">
                        <div className="text-white font-semibold text-2xl border-b py-2">Comments...</div>
                        <CommentsContainer comments={comment} />
                    </div>
                </div>
                <div className="recommndation w-1/4 overflow-y-scroll no-scrollbar flex-col flex">
                    <VerticalVideoCard videos={videos} />
                </div>
            </div>
        </>
    )
}