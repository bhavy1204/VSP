import { Link } from "react-router-dom"
import api from "../../../axios";

export default function VideoCard({ title, views, thumbnail, upload, videoId }) {

    const handleVideoClick = async () => {
        try {
            const res = await api.post(`/v1/users/addToWatchHistory/${videoId}`)
            console.log(res);
        } catch (err) {
            console.log("WATCH HISTORY ADD ERROR : ", err);
        }
    }


    return (
        <>
            <Link to={`/video/${videoId}`} >
                <div className="card-container m-4 bg-gray-900 rounded-2xl" onClick={handleVideoClick}>
                    <div className="thumbnail flex justify-center px-0.5 pt-0.5 h-48 overflow-hidden">
                        <img src={thumbnail} alt="" className="rounded-t-md w-full h-full object-cover" />
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