import UserCardGrid from "../Videos/UserCardGrid.jsx";
import { useVideos } from "../VideoProvider";
import { useEffect, useState } from "react";
import api from "../../../axios.js";
import HistoryCardGrid from "./HistoryCardGrid.jsx";


export default function History() {

    const [videos, updateVideos] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            // const user = JSON.parse(localStorage.getItem("user"));
            const res =  await api.get("/v1/users/watchHistory");
            // console.log("HISTORY DATA >> ", res)
            updateVideos(res.data.data)
        };
        fetchHistory();
    }, []);

    const removeVideoFromState = (videoId) => {
        updateVideos((prev) => prev.filter((v) => v._id !== videoId));
    };

    return (
        <>
            <h1 className="text-white text-3xl mx-2 my-1 border-b-1 pb-2">Your history</h1>
            <HistoryCardGrid videoList={videos} onRemove={removeVideoFromState}/>
        </>
    )
}