import Navbar from "../Navbar";
import Commentscard from "./Commentscard";
import VideoCard from "./Videocard";

export default function VideoPlaying({link,desc}) {
    return (
        <>
            <Navbar />
            <div className="main flex h-screen">
                <div className="video flex-1 w-3/4 pb-12 pt-6 px-6 overflow-y-auto no-scrollbar bg-gray-900">
                    <video src="https://res.cloudinary.com/dr2tagfk8/video/upload/v1756791160/istockphoto-1253263447-640_adpp_is_ziugl4.mp4"
                        controls 
                        className="w-full mb-4"
                    >
                    </video>
                    <div className="description bg-gray-900 text-gray-500 px-4">
                        <p>{desc}</p>
                    </div>
                    <div className="comments my-4 p-2 rounded-2xl">
                        <div className="text-white font-semibold text-2xl border-b py-2">Comments...</div>
                        <Commentscard />
                        <Commentscard />
                        <Commentscard />
                        <Commentscard />
                        <Commentscard />
                        <Commentscard />
                        <Commentscard />
                        <Commentscard />
                        <Commentscard />
                        <Commentscard />
                    </div>
                </div>
                <div className="recommndation w-1/4 overflow-y-scroll no-scrollbar">
                    <div className="flex flex-col">
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                    </div>
                </div>
            </div>
        </>
    )
}