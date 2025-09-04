import CardGrid from "./CardGrid"
import Navbar from "../Navbar"
import SideBar from "../SideBar"
import axios from "axios"
import { useEffect, useState } from "react"

export default function HomePage({user}) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/video/get/all");
                console.log(res)
                setVideos(res.data.data);
            } catch (error) {
                console.log(error);
                alert("Error while displaying videos")
            } finally {
                setLoading(false);
            }
        }
        fetchVideos()
    }, []);


    return (
        <>
            <div className="flex flex-col h-screen">
                <Navbar user={user}/>
                <div className="flex flex-1 overflow-hidden no-scrollbar">
                    <SideBar />
                    <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
                        {loading ? (
                            <p>Loading videos...</p>
                        ) : (
                            <CardGrid videos={videos} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}