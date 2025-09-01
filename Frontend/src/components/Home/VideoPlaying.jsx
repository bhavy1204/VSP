import Navbar from "../Navbar";
import Commentscard from "./Commentscard";
import VideoCard from "./Videocard";

export default function VideoPlaying(){
    return(
        <>
            <Navbar/>
            <div className="main flex h-screen">
                <div className="video flex-1 w-3/4 pb-12 pt-6 px-6 overflow-y-auto no-scrollbar bg-gray-900">
                    <video src="istockphoto-1253263447-640_adpp_is.mp4" controls className="w-full mb-4"></video>
                    <div className="description bg-gray-900 text-gray-500 px-4">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit maiores voluptates doloribus esse quibusdam unde dolorem illo sint possimus, optio, illum veniam. Iusto facere tenetur sed iste dolores ea. Eius earum omnis doloremque fugit assumenda exercitationem amet dicta unde animi nesciunt, fugiat commodi asperiores a ipsum! Voluptatibus facere doloribus nam blanditiis beatae totam ipsa repudiandae asperiores quaerat deserunt. Fuga itaque tempora nemo sed labore eum officia tenetur molestiae commodi voluptatem harum repellendus incidunt esse vel cum voluptatum vitae reiciendis ullam dolores doloribus earum, consequatur, voluptate dicta numquam. Dicta, deleniti magni omnis, inventore accusantium nemo tempora doloribus, tempore animi fugiat facere.</p>
                    </div>
                    <div className="comments my-4 p-2 rounded-2xl">
                        <div className="text-white font-semibold text-2xl border-b py-2">Comments...</div>
                        <Commentscard/>
                        <Commentscard/>
                        <Commentscard/>
                        <Commentscard/>
                        <Commentscard/>
                        <Commentscard/>
                        <Commentscard/>
                        <Commentscard/>
                        <Commentscard/>
                        <Commentscard/>
                    </div>
                </div>
                <div className="recommndation w-1/4 overflow-y-scroll no-scrollbar">
                    <div className="flex flex-col">
                        <VideoCard/>
                        <VideoCard/>
                        <VideoCard/>
                        <VideoCard/>
                        <VideoCard/>
                        <VideoCard/>
                        <VideoCard/>
                        <VideoCard/>
                        <VideoCard/>
                    </div>
                </div>
            </div>
        </>
    )
}