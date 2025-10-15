import Commentscard from "./Commentscard"
import EmptyState from "../utils/EmptyState"

export default function CommentsContainer({ comments=[] }) {
    return (
        <>
            <div className="div">

                {comments.length > 0 ? (
                    comments.map((c) => (
                        <Commentscard
                            key={c._id}
                            owner={c.owner}
                            content={c.content}
                            id = {c._id}
                        />
                    ))
                ) : (
                    <EmptyState message="No comments yet"/>
                )}
            </div>
        </>
    )
}