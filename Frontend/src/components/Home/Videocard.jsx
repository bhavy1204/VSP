export default function VideoCard(){
    return(
        <>
            <div className="card-container m-4 bg-gray-900 rounded-2xl">
                <div className="thumbnail flex justify-center pt-2">
                    <img src="thumbnail.webp" alt="" className="rounded-sm" />
                </div>
                <div className="data">
                    <div className="title text-white flex justify-start px-4 py-1">
                        Sample title
                    </div>
                    <div className="details flex justify-around px-2 py-2 text-gray-400">
                        <div className="views">
                            45k views 
                        </div>
                        <div className="uploadedAT">
                            8 months ago
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}