import VideoCard from "./Videocard";
import { formatDistanceToNow } from "date-fns";
import { useOutletContext } from "react-router-dom";

export default function CardGrid() {
    const {videos} = useOutletContext()
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.length > 0 ? (
                    videos.map((v) => (
                        <VideoCard
                            key={v._id}
                            videoId={v._id}
                            title={v.title}
                            thumbnail={v.thumbnail}
                            views={v.views}
                            upload={formatDistanceToNow(new Date(v.createdAt), { addSuffix: true })}
                        />
                    )) ): (
                    <VideoCard
                        key={1}
                        videoId={1}
                        title={"sample video title"}
                        thumbnail={"https://res.cloudinary.com/dr2tagfk8/image/upload/v1756790643/404_ytn6mq.webp"}
                        views={"N/A"}
                        upload={"N/A"}
                    />
                )}
            </div>
        </>
    )
}