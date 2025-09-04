import { ArrowDownToLine, Scissors, ThumbsUp, House, SquarePlay, GalleryVerticalEnd, Music, ShoppingCart, Clapperboard, Radio, Gamepad2, Newspaper, Trophy, Book, Shirt, Podcast, Settings, Flag, MessageSquareText, MessageCircleQuestionMark, Clock, TvMinimalPlay, ListVideo, History, CircleUser } from 'lucide-react';

export default function SideBar({ sidebar }) {
    return (
        <>
            <section className={` text-gray-400 border-r border-gray-500 h-full overflow-y-auto no-scrollbar ${sidebar ? "w-1/7 " : "w-0 border-r-0"}  `}>

                <div className="nav flex items-baseline px-3 py-3 gap-5 flex-col border-b-1 border-gray-500">

                    <div className="home flex items-center gap-2">
                        <House /> <p>Home</p>
                    </div>
                    <div className="shorts flex items-center gap-2">
                        <SquarePlay /> <p>Shorts</p>
                    </div>
                    <div className="subscription flex items-center gap-2">
                        <GalleryVerticalEnd /> <p>Subscriptions</p>
                    </div>

                </div>

                <div className="user-nav flex items-baseline px-3 py-3 gap-5 flex-col border-b-1 border-gray-500">

                    <div className="history flex items-center gap-2">
                        <History /> <p>History</p>
                    </div>
                    <div className="playlist flex items-center gap-2">
                        <ListVideo /> <p>Playlists</p>
                    </div>
                    <div className="your-videos flex items-center gap-2">
                        <TvMinimalPlay /> <p>Your-Videos</p>
                    </div>
                    <div className="watch-later flex items-center gap-2">
                        <Clock /> <p>Watch later</p>
                    </div>
                    <div className="liked-videos flex items-center gap-2">
                        <ThumbsUp /> <p>Liked Videos</p>
                    </div>
                    <div className="downloads flex items-center gap-2">
                        <ArrowDownToLine /> <p>Downloads</p>
                    </div>
                    <div className="your-clips flex items-center gap-2">
                        <Scissors /> <p>Your-Clips</p>
                    </div>

                </div>

                <div className="channels flex items-baseline px-3 py-3 gap-5 flex-col border-b-1 border-gray-500">

                    <div className="channel-1 flex items-center gap-2">
                        <CircleUser /> <p>Channel 1</p>
                    </div>

                </div>

                <div className="features flex items-baseline px-3 py-3 gap-5 flex-col border-b-1 border-gray-500">

                    <div className="shopping flex items-center gap-2">
                        <ShoppingCart /> <p>Shopping</p>
                    </div>
                    <div className="music flex items-center gap-2">
                        <Music /> <p>Music</p>
                    </div>
                    <div className="movies flex items-center gap-2">
                        <Clapperboard /> <p>Movies</p>
                    </div>
                    <div className="live flex items-center gap-2">
                        <Radio /> <p>Live</p>
                    </div>
                    <div className="gaming flex items-center gap-2">
                        <Gamepad2 /> <p>Gaming</p>
                    </div>
                    <div className="news flex items-center gap-2">
                        <Newspaper /> <p>News</p>
                    </div>
                    <div className="sports flex items-center gap-2">
                        <Trophy /> <p>Sports</p>
                    </div>
                    <div className="courses flex items-center gap-2">
                        <Book /> <p>Courses</p>
                    </div>
                    <div className="fashion flex items-center gap-2">
                        <Shirt /> <p>Fashion</p>
                    </div>
                    <div className="podcast flex items-center gap-2">
                        <Podcast /> <p>Podcast</p>
                    </div>

                </div>

                <div className="maintainence flex items-baseline px-3 py-3 gap-5 flex-col border-b-1 border-gray-500">

                    <div className="settings flex items-center gap-2">
                        <Settings /> <p>Settings</p>
                    </div>
                    <div className="report flex items-center gap-2">
                        <Flag /> <p>Flag</p>
                    </div>
                    <div className="help flex items-center gap-2">
                        <MessageCircleQuestionMark /> <p>Help</p>
                    </div>
                    <div className="send-feedback flex items-center gap-2">
                        <MessageSquareText /> <p>Feedback</p>
                    </div>

                </div>

            </section >
        </>
    )
}