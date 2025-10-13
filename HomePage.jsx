import CardGrid from "./Frontend/src/components/Home/Videos/CardGrid.jsx";
import Navbar from "./Frontend/src/components/Home/Navbar.jsx";
import SideBar from "./Frontend/src/components/Home/SideBar.jsx";
import axios from "axios";
import Loader from "./Frontend/src/components/utils/Loader.jsx";
import { useEffect, useState } from "react";

export default function HomePage({ user }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebar, setIsSidebar] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const limit = 10;

    const toggleSidebar = () => setIsSidebar(prev => !prev);

    // ✅ Fetch videos (called automatically when page changes)
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:3000/api/v1/video/get/all?page=${page}&limit=${limit}`,
                    { withCredentials: true }
                );

                

                const fetched = res.data.data || [];
                

                setVideos(prev => (page === 1 ? fetched : [...prev, ...fetched]));
                if (fetched.length < limit) setHasMore(false);
            } catch (error) {
                console.error("Error fetching videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [page]);

    // ✅ Infinite scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (loading || !hasMore) return;

            // when user reaches 85% of the page height
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.85) {
                setPage(prev => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    return (
        <div className="flex flex-col h-screen">
            <Navbar user={user} toggleSidebar={toggleSidebar} />
            <div className="flex flex-1 overflow-hidden no-scrollbar">
                <SideBar sidebar={sidebar} />
                <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
                    <CardGrid video={videos} />
                    {loading && <Loader />}
                    {!hasMore && (
                        <p className="text-gray-400 text-center mt-4">
                            You have reached the end !
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
