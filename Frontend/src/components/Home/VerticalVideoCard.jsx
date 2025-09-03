import VideoCard from "./Videocard"

export default function VerticalVideoCard({videos=[]}) {
    return (
        <>
            <div className="flex fllex-col">
                {videos.length > 0 ? (

                    videos.map((v) => (
                        <VideoCard
                            key={v._id}
                            videoId={v._id}
                            title={v.title}
                            thumbnail={v.thumbnail}
                            views={v.views}
                            upload={v.createdAt}
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