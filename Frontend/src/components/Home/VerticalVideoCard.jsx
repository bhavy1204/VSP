import VideoCard from "./Videocard"
import { formatDistanceToNow, formatDistanceToNowStrict} from "date-fns";

export default function VerticalVideoCard({videos=[]}) {
    return (
        <>
            <div className="flex flex-col">
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
                    ))) : (
                    <VideoCard
                        key={1}
                        videoId={1}
                        title={"sample video title"}
                        thumbnail={"https://res.cloudinary.com/dr2tagfk8/image/upload/v1756790643/404_ytn6mq.webp"}
                        views={1000}
                        upload={9}
                    />
                )}
            </div>
        </>
    )
}