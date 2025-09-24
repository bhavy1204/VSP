import CardGrid from "./Videos/CardGrid"
import Navbar from "./Navbar"
import SideBar from "./SideBar"
import axios from "axios"
import Loader from "../utils/Loader"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

export default function HomePage({ user }) {
    // For videos
    const [videos, setVideos] = useState([]);
    // For tweets
    const [tweets, setTweets] = useState([]);
    // FOr loader
    const [loading, setLoading] = useState(true);
    // FOr loader
    const [tweetLoading, setTweetLoading] = useState(true);
    // Side bar 
    const [sidebar, setIsSidebar] = useState(true);

    const toggleSidebar = () => setIsSidebar(prev => !prev);

    // Fetching all videos
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const vidRes = await axios.get("http://localhost:3000/api/v1/video/get/all");
                console.log(vidRes)
                setVideos(vidRes.data.data);
            } catch (error) {
                console.log(error);
                alert("Error while displaying videos")
            } finally {
                setLoading(false);
            }
        }
        fetchVideos()
    }, []);

    // Fetching all tweets
    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/tweet/all");
                console.log(res)
                setTweets(res.data.data);
            } catch (error) {
                console.log(error);
                alert("Error while displaying videos")
            } finally {
                setTweetLoading(false);
            }
        }
        fetchTweets()
    }, []);


    return (
        <>
            <div className="flex flex-col h-screen">
                <Navbar user={user} toggleSidebar={toggleSidebar} />
                <div className="flex flex-1 overflow-hidden no-scrollbar">
                    <SideBar sidebar={sidebar} />
                    <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
                        {loading ? (
                            <Loader />
                        ) : (
                            // <CardGrid videos={videos} />
                            <Outlet context={{ videos, tweets }} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}