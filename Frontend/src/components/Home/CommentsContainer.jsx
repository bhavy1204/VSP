import Commentscard from "./Commentscard"

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
                    <Commentscard
                        key={101}
                        owner={"user"}
                        content={"this is a sample comment"}
                    />
                )}
            </div>
        </>
    )
}