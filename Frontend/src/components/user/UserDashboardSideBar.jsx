import { ArrowDownToLine, Scissors, ThumbsUp, House, SquarePlay, GalleryVerticalEnd, Music, ShoppingCart, Clapperboard, Radio, Gamepad2, Newspaper, Trophy, Book, Shirt, Podcast, Settings, Flag, MessageSquareText, MessageCircleQuestionMark, LogOut, Clock, TvMinimalPlay, ListVideo, History, CircleUser, FilePlay, StickyNote, Heart } from 'lucide-react';
import api from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import { Links } from 'react-router-dom';



export default function UserDashboardSideBar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // My videos
    const handleMyVideos = async () => {
        window.location.href = "/dashboard/myVideos"
    }

    // history
    const handleHistory = async () => {
        window.location.href = "/dashboard/history";
    }

    // logout
    const handleLogout = async () => {
        localStorage.removeItem("user")
        dispatch(logout())
        const res = await api.post("/v1/users/logout")
        console.log(res);
        window.location.href = "/home/videos";
    }

    // Upload videos
    const handleUploadVideos = async () => {
        navigate("/dashboard/upload");
    }

    return (
        <>
            <section className="h-full border-r-1 border-gray-500 w-1/7 text-gray-500 px-3 py-3">
                <div className="platform flex flex-col gap-5 ">
                    <div className="myVideos flex gap-2  hover:text-cyan-600" onClick={handleUploadVideos}>
                        <FilePlay /> upload video
                    </div>
                    <div className="myVideos flex gap-2  hover:text-cyan-600" onClick={handleMyVideos}>
                        <FilePlay /> My Videos
                    </div>
                    <div className="myVideos flex gap-2  hover:text-cyan-600" onClick={handleHistory}>
                        <StickyNote /> My posts
                    </div>
                    <div className="myVideos flex gap-2  hover:text-cyan-600" onClick={handleHistory}>
                        <History /> History
                    </div>
                    <div className="myVideos flex gap-2  hover:text-cyan-600" onClick={handleHistory}>
                        <Heart /> Liked video
                    </div>
                    <div className="myVideos flex gap-2 hover:text-cyan-600" onClick={handleHistory}>
                        <ThumbsUp /> liked post
                    </div>
                    <div className="myVideos flex gap-2  hover:text-cyan-600" onClick={handleHistory}>
                        <CircleUser /> My Subscriptions
                    </div>
                    <div className="myVideos flex gap-2  hover:text-cyan-600" onClick={handleHistory}>
                        <ListVideo /> My playlist
                    </div>
                    <div className="myVideos flex gap-2  hover:text-cyan-600" onClick={handleLogout}>
                        <LogOut /> Logout
                    </div>
                </div>
            </section>
        </>
    )
}