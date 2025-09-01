import { ArrowDownToLine, Scissors, ThumbsUp, House, SquarePlay, GalleryVerticalEnd, Music, ShoppingCart, Clapperboard, Radio, Gamepad2, Newspaper, Trophy, Book, Shirt, Podcast, Settings, Flag, MessageSquareText, MessageCircleQuestionMark, Clock, TvMinimalPlay, ListVideo, History, CircleUser, FilePlay, StickyNote, Heart } from 'lucide-react';

export default function UserDashboardSideBar() {
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
                        <History/> History
                    </div>
                    <div className="myVideos flex gap-2">
                        <Heart /> Liked video
                    </div>
                    <div className="myVideos flex gap-2">
                        <ThumbsUp /> liked post
                    </div>
                    <div className="myVideos flex gap-2">
                        <CircleUser/> My Subscriptions
                    </div>
                    <div className="myVideos flex gap-2">
                        <ListVideo /> My playlist
                    </div>
                </div>
            </section>
        </>
    )
}