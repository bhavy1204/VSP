import { ThumbsDown, ThumbsUp } from "lucide-react"

export default function Commentscard({owner, content}){
    return(
        <div className="p-5 flex flex-col gap-2 bg-gray-950 my-5 rounded-2xl">
            <div className="user text-indigo-600">
                {owner}
            </div>
            <div className="comment text-gray-600">
                {content}
            </div>
            <div className="likes flex text-white font-thin gap-6 size-14 items-center h-fit">
                <ThumbsUp />
                <ThumbsDown />
            </div>
        </div>
    )
}