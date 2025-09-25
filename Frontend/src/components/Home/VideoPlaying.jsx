import { useState } from "react";
import Navbar from "./Navbar";
import VerticalVideoCard from "./Videos/VerticalVideoCard.jsx";
import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { ThumbsUp, ThumbsDown, Share2, MessageCircle, DownloadIcon, Link, Facebook } from "lucide-react";
import CommentsContainer from "./CommentsContainer";
import axios from "axios";
import api from "../../axios.js";
import { useSelector } from "react-redux";

export default function VideoPlaying() {
    const { videoId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    // Comment 
    const [form, setForm] = useState({ ownerId: "", content: "", videoId: "" });

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

    //  dislikes
    const [dislikes, setDislikes] = useState();
    const [isDisliked, setIsDisliked] = useState();

    //  share
    const [shareOpen, setShareOpen] = useState(false);

    // llink
    const [copied, setCopied] = useState("");

    // comment
    const [addCommentForm, setAddCommentForm] = useState(false);

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
                console.log("Comment fetch res : ",res);
                setComment(res.data.data);
            } catch (error) {
                console.log("Error while comments show :- ", error);
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
            console.log("LIKE KA RES ", res);
            setIsLiked(res.data.data.isLiked);
            setLikes(res.data.data.likesCount);
        } catch (error) {
            console.log("Like Error :: ", error)
        }
    }

    // dislike toggle 
    const handleDislikeToggle = async () => {
        try {
            const res = await api.post(`/v1/dislike/toggle/v/${mainVideoData?._id}`);
            console.log("DISLIKE KA RES >> ", res)
            setIsDisliked(res.data.data.isDisliked)
            setDislikes(res.data.data.dislikesCount)
        } catch (error) {
            console.log("Dislike error ", error)
        }
    }

    // for shre
    const handleShare = async () => {
        setShareOpen(!shareOpen);
    }

    // Copy to clipboard
    const handleCopyLink = async () => {
        let url = window.location.origin + location.pathname
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        alert("Copied URL: " + url);
    }

    // WhatsApp share
    const handleWhatsappShare = async () => {
        const url = window.location.href; // current page
        const text = encodeURIComponent(`Check this out: ${url}`);
        const whatsappUrl = `https://wa.me/?text=${text}`;

        window.open(whatsappUrl, "_blank");
    }

    // for download
    const handleDownload = async () => {
        const link = document.createElement("a");
        link.href = mainVideoData?.videoFile; // your video URL
        link.download = `${mainVideoData?.title || "video"}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // for add comments
    const handleAddComment = async () => {
        setAddCommentForm(!addCommentForm);
    }

    // for submit comment
    const handleSubmitComment = async (e) => {
        e.preventDefault();

        console.log("Comment form data", user?.data?._id,form.content,mainVideoData?._id )

        try {
            const res = await api.post("/v1/comment/v", {
                ownerId: user?.data?._id,
                content: form.content,
                videoId: mainVideoData?._id,
            });

            setAddCommentForm(false);
            setForm({ ownerId: "", content: "", videoId: "" });
            setComment(prev => [...prev, res.data.data]);
        } catch (error) {
            console.log(error);
            alert("Some error while adding comment");
        }
    }

    const handleCommentChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
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
                    <div className="interact flex justify-between px-4 items-center text-gray-300 no-scrollbar ">
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
                                    <ThumbsUp className={`${isLiked ? "text-red-600" : "text-white"}`} />
                                    <p>{likes}</p>
                                </div>
                                <div className="flex items-center gap-1" onClick={handleDislikeToggle}>
                                    <ThumbsDown className={`${isDisliked ? "text-red-600" : "text-white"}`} />
                                    <p>{dislikes}</p>
                                </div>
                            </div>

                        </div>
                        <div className=" flex gap-2">
                            <div className="relative">
                                <div className=" share flex gap-2 bg-gray-600 py-2 px-4 rounded-2xl " onClick={handleShare}>
                                    <Share2 />
                                    Share
                                </div>
                                {shareOpen &&
                                    <div className="absolute left-0 mt-2 w-56 bg-white text-black rounded-xl shadow-lg p-3 z-50 flex flex-col gap-2">
                                        <button className="bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-1 text-sm text-left  flex gap-1"
                                            onClick={handleCopyLink}>
                                            <Link className="text-sm font-thin py-1" /> Copy Link
                                        </button>
                                        <button className="bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-1 text-sm text-left  flex gap-1" onClick={handleWhatsappShare}>
                                            <MessageCircle className="text-sm font-thin py-1" />Share on WhatsApp
                                        </button>
                                    </div>
                                }
                            </div>
                            <div className="comments flex gap-2 bg-gray-600 py-2 px-4 rounded-2xl " onClick={() => document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })}>
                                <MessageCircle />
                                Comments
                            </div>
                            <div className="download flex gap-2 bg-gray-600 py-2 px-4 rounded-2xl " onClick={handleDownload}>
                                <DownloadIcon />
                                Download
                            </div>
                        </div>
                    </div>
                    <div className="description bg-gray-900 text-gray-500 px-4">
                        <p>{mainVideoData?.description}</p>
                    </div>
                    <div className="comments my-4 p-2 rounded-2xl" id="comments">
                        <div className=" flex items-center  border-b text-white justify-between">
                            <div className="text-white font-semibold text-2xl py-2">Comments...</div>
                            {user && <div className="bg-green-600 text-white font-semibold px-3 py-1 rounded-md " onClick={handleAddComment}>
                                Add comment
                            </div>}
                        </div>
                        {console.log("This is s a user", user)}
                        {addCommentForm &&
                            <div className="p-5 flex flex-col gap-2 bg-gray-950 my-5 rounded-2xl">
                                <form action="" onSubmit={handleSubmitComment}>

                                    <div className="user text-indigo-600">
                                        <input type="text" value={user.data.fullName} readOnly name="username" />
                                    </div>
                                    <div className="comment text-gray-600">
                                        <input
                                            type="text"
                                            className=" text-gray-300 w-full border-b py-2 focus:outline-none"
                                            placeholder="Add comment"
                                            name="content"
                                            onChange={handleCommentChange}
                                        />
                                    </div>
                                    <button
                                        className="Add font-thin gap-6 size-1/8 text-center items-center h-fit bg-green-600 text-white rounded-md my-2"
                                        type="submit"
                                    >
                                        Add
                                    </button>
                                </form>
                            </div>
                        }
                        <CommentsContainer comments={comment} />
                    </div>
                </div>
                <div className="recommndation w-1/4 overflow-y-scroll no-scrollbar flex-col flex">
                    <VerticalVideoCard videos={videos} />
                </div>
            </div >
        </>
    )
}