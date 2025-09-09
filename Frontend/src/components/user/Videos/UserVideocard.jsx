import { Link } from "react-router-dom"

export default function UserVideoCard({title, views, thumbnail,upload,videoId}) {
    return (
        <>
            <Link to={`/api/v1/video/get/:${videoId}`} >
                <div className="card-container m-4 bg-gray-900 rounded-2xl">
                    <div className="thumbnail flex justify-center px-0.5 pt-0.5">
                        <img src={thumbnail} alt="" className="rounded-t-md" />
                    </div>
                    <div className="data">
                        <div className="title text-white flex justify-start px-4 py-1">
                            {title}
                        </div>
                        <div className="details flex justify-between px-2 py-2 text-gray-400 text-sm font-thin">
                            <div className="views ">
                                {views} views
                            </div>
                            <div className="uploadedAT">
                                {upload}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}