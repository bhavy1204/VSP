import UserCardGrid from "../Videos/UserCardGrid.jsx";
import { useVideos } from "../VideoProvider";
import { useEffect } from "react";
import api from "../../../axios.js";


export default function History() {

     const {videos, updateVideos} = useVideos();

    useEffect(() => {
        const fetchHistory = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const res = localStorage.getItem("user")?.watchHistory || await api.get("/watchHistory");
            updateVideos("historyVideos", res.data.data);
        };
        fetchHistory();
    }, []);

    return (
        <>
            <UserCardGrid type="historyVideos" />
        </>
    )
}