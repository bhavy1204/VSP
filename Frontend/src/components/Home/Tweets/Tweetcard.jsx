import { Link } from "react-router-dom"

export default function TweetCard({ creator, content,createdAt}) {
    return (
        <>
            <Link to={`/api/v1/user/c/${creator}`}>
                <div className="card-container m-4 bg-gray-900 rounded-2xl h-11/12 flex flex-col overflow-y-auto no-scrollbar">
                    <div className="thumbnail flex justify-start mx-3  pt-3 border-b text-gray-500">
                        <h2>{creator}</h2>
                    </div>
                    <div className="data flex-1">
                        <div className="details flex justify-between mx-3 py-2 text-gray-400 text-sm ">
                            {content}
                        </div>
                    </div>
                    <div className="date flex justify-start mx-3  pb-0 mb-2 text-sm text-gray-500 font-thin border-t border-gray-700">
                        {createdAt}
                    </div>
                </div>
            </Link>
        </>
    )
}