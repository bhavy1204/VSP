import { useState } from "react";
import Navbar from "../Navbar";
import VerticalVideoCard from "./VerticalVideoCard";
import { useEffect} from "react";
import {useParams} from "react-router-dom"
import { ThumbsUp, ThumbsDown, Share2, MessageCircle, DownloadIcon } from "lucide-react";
import CommentsContainer from "./CommentsContainer";
import axios from "axios";

export default function VideoPlaying({desc}) {

    const {videoId} = useParams();

    // side side video variables
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // video data var
    const [videoData, setVideoData] = useState();

    // comments variable
    const [comment, setComment] = useState([]);

    // For video data
     useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const res = axios.get(`http://localhost:3000/api/v1/video/get/${videoId}`);
                console.log(res);
                setVideoData(res.data);
            } catch (error) {
                console.log(error);
                alert("Error while showing video data")
            } finally {
                setLoading(false);
            }
        }
        fetchVideoData()
    }, [comment]);

    // For comments
     useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = axios.get(`http://localhost:3000/api/v1/comment/v/${videoId}`);
                console.log(res);
                setComment(res.data);
            } catch (error) {
                console.log(error);
                alert("Error while displaying comments")
            } finally {
                setLoading(false);
            }
        }
        fetchComments()
    }, [comment]);

    // For side bar videos
     useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = axios.get(`http://localhost:3000/api/v1/video/get/all`);
                console.log(res);
                setVideos(res.data);
            } catch (error) {
                console.log(error);
                alert("Error while displaying comments")
            } finally {
                setLoading(false);
            }
        }
        fetchVideos()
    }, [comment]);

    let likes = 10;

    return (
        <>
            <Navbar />
            <div className="main flex h-screen">
                <div className="video flex-1 w-3/4 pb-12 pt-6 px-6 overflow-y-auto no-scrollbar bg-gray-900">
                    <video src="https://res.cloudinary.com/dr2tagfk8/video/upload/v1756791160/istockphoto-1253263447-640_adpp_is_ziugl4.mp4"
                        controls
                        className="w-full mb-4"
                    >
                    </video>
                    <div className="interact flex justify-between px-4 items-center text-gray-300 overflow-x-auto ">
                        <div className="channel flex gap-6 items-center">
                            <div className=" flex items-center  py-1.5 text-lg gap-2">
                                <img src="/404.webp" alt="" className="h-10 w-10 border rounded-full" />
                                <p>Channel</p>
                            </div>
                            <div className="toggle ">
                                <button className="bg-gray-600 py-2 px-4 rounded-2xl ">Subscribe</button>
                            </div>
                            <div className="like flex bg-gray-600 py-2 px-4 rounded-2xl gap-4">
                                <div className="flex items-center gap-1 border-r-1 pr-2">
                                    <ThumbsUp className=""/>
                                    <p>{likes}</p>
                                </div>
                                <div className="flex flex-col">
                                    <ThumbsDown />
                                </div>
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
                        <p>{desc}</p>
                    </div>
                    <div className="comments my-4 p-2 rounded-2xl">
                        <div className="text-white font-semibold text-2xl border-b py-2">Comments...</div>
                        <CommentsContainer comments={comment} />
                    </div>
                </div>
                <div className="recommndation w-1/4 overflow-y-scroll no-scrollbar">
                    <VerticalVideoCard videos={videos} />
                </div>
            </div>
        </>
    )
}