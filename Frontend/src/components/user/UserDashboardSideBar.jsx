import { ArrowDownToLine, Scissors, ThumbsUp, House, SquarePlay, GalleryVerticalEnd, Music, ShoppingCart, Clapperboard, Radio, Gamepad2, Newspaper, Trophy, Book, Shirt, Podcast, Settings, Flag, MessageSquareText, MessageCircleQuestionMark, LogOut, Clock, TvMinimalPlay, ListVideo, History, CircleUser, FilePlay, StickyNote, Heart } from 'lucide-react';
import api from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';


export default function UserDashboardSideBar({ setHistoryVideos, setLikedVideo, setLikedPost, setSubscription, setplaylist}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleHistory = async () =>{
        const res = localStorage.getItem("user")?.watchHistory || api.get("/watchHistory");
        setHistoryVideos(res);
        window.location.href = "/dashboard/history";
    }

    const handleLogout = async () => {
        localStorage.removeItem("user")
        dispatch(logout())
        const res = await api.post("/v1/users/logout")
        console.log(res);
        window.location.href = "/home/videos";
    }


    return (
        <>
            <section className="h-full border-r-1 border-gray-500 w-1/7 text-gray-500 px-3 py-3">
                <div className="platform flex flex-col gap-5 ">
                    <div className="myVideos flex gap-2">
                        <FilePlay /> My Videos
                    </div>
                    <div className="myVideos flex gap-2">
                        <StickyNote /> My posts
                    </div>
                    <div className="myVideos flex gap-2" onClick={handleHistory}>
                        <History /> History
                    </div>
                    <div className="myVideos flex gap-2">
                        <Heart /> Liked video
                    </div>
                    <div className="myVideos flex gap-2">
                        <ThumbsUp /> liked post
                    </div>
                    <div className="myVideos flex gap-2">
                        <CircleUser /> My Subscriptions
                    </div>
                    <div className="myVideos flex gap-2">
                        <ListVideo /> My playlist
                    </div>
                    <div className="myVideos flex gap-2" onClick={handleLogout}>
                        <LogOut /> Logout
                    </div>
                </div>
            </section>
        </>
    )
}