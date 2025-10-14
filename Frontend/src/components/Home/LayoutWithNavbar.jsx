import CardGrid from "./Videos/CardGrid";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import Loader from "../utils/Loader";
import { useEffect, useState, useCallback, useRef } from "react";
import { Outlet } from "react-router-dom";
import api from "../../axios";

export default function HomePage({ user }) {
    // Video states
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // Tweets
    const [tweets, setTweets] = useState([]);
    const [tweetLoading, setTweetLoading] = useState(true);

    // Sidebar
    const [sidebar, setIsSidebar] = useState(true);
    const toggleSidebar = () => setIsSidebar(prev => !prev);

    // search
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Scroll container reference
    const scrollContainerRef = useRef(null);
    const limit = 8;

    // ✅ Fetch videos (paginated + recommendation)
    const fetchVideos = useCallback(async (currentPage) => {
        try {
            setLoading(true);
            const res = await api.get(`/v1/video/get/all?page=${currentPage}&limit=${limit}`, {
                withCredentials: true,
            });

            const newVideos = res.data?.data || [];
            if (newVideos.length === 0) {
                setHasMore(false);
            } else {
                setVideos(prev => [...prev, ...newVideos]);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // ✅ Fetch initial videos and on page change
    useEffect(() => {
        fetchVideos(page);
    }, [fetchVideos, page]);

    // ✅ Infinite Scroll inside the scrollable div
    useEffect(() => {
        const scrollDiv = scrollContainerRef.current;
        if (!scrollDiv) return;

        const handleScroll = () => {
            const bottom = scrollDiv.scrollHeight - scrollDiv.scrollTop <= scrollDiv.clientHeight + 100;
            if (bottom && hasMore && !loading) {
                setPage(prev => prev + 1);
            }
        };

        scrollDiv.addEventListener("scroll", handleScroll);
        return () => scrollDiv.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading]);

    // ✅ Fetch tweets
    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const res = await api.get("/v1/tweet/all");
                setTweets(res.data.data || []);
            } catch (error) {
                console.error("Error fetching tweets:", error);
            } finally {
                setTweetLoading(false);
            }
        };
        fetchTweets();
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Navbar
                user={user}
                toggleSidebar={toggleSidebar}
                setSearchQuery={setSearchQuery}
                setSearchResults={setSearchResults}
            />
            <div className="flex flex-1 overflow-hidden no-scrollbar">
                <SideBar sidebar={sidebar} />
                <div ref={scrollContainerRef} className="flex-1 p-4 overflow-y-auto no-scrollbar">
                    {videos.length === 0 && loading ? (
                        <Loader />
                    ) : (
                        <>
                            <Outlet context={{ videos, tweets, searchQuery, setSearchQuery, searchResults, setSearchResults }} />
                            {loading && <p className="text-center text-gray-400 mt-4">Loading more videos...</p>}
                            {!hasMore && <p className="text-center text-gray-500 mt-4">No more videos!</p>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
