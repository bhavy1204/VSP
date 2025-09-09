import UserVideoCard from "./UserVideocard";
import { formatDistanceToNow } from "date-fns";
import { useOutletContext } from "react-router-dom";
import { useVideos } from "../VideoProvider.jsx";

export default function UserCardGrid({type}) {
    const { videos } = useVideos();
    const videoList = videos[type] || [];
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videoList.length > 0 ? (
                    videoList.map((v) => (
                        <UserVideoCard
                            key={v._id}
                            videoId={v._id}
                            title={v.title}
                            thumbnail={v.thumbnail}
                            views={v.views}
                            upload={formatDistanceToNow(new Date(v.createdAt), { addSuffix: true })}
                        />
                    )) ): (
                    <UserVideoCard
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