import { ArrowDownToLine, Scissors, ThumbsUp, House, SquarePlay, GalleryVerticalEnd, Music, ShoppingCart, Clapperboard, Radio, Gamepad2, Newspaper, Trophy, Book, Shirt, Podcast, Settings, Flag, MessageSquareText, MessageCircleQuestionMark, LogOut, Clock, TvMinimalPlay, ListVideo, History, CircleUser, FilePlay, StickyNote, Heart } from 'lucide-react';
import axios from 'axios';
import api from '../../axios';
import { useNavigate } from 'react-router-dom';


export default function UserDashboardSideBar({user}) {

    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem("user")
        const res = await api.post("/v1/users/logout")
        console.log(res);
        window.location.href = "/home";
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
                    <div className="myVideos flex gap-2">
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