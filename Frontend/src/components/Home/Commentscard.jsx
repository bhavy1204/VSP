import { ThumbsDown, ThumbsUp } from "lucide-react"
import { useSelector } from "react-redux";
import api from "../../axios";
import { useState } from "react";
import { Form } from "react-router-dom";


export default function Commentscard({ owner, content, id }) {

    const [isEditable, setIsEditable] = useState(false);

    // Comment 
    const [form, setForm] = useState({newContent: content  });

    const handleDislike = () => {

    }

    const handleLike = () => {

    }


    const onEdit = async () => {
        setIsEditable(!isEditable)
    }

    const onDelete = async () => {
        try {
            const res = await api.delete(`v1/comment/c/${id}`);
        } catch (error) {
            console.log("comment delete error : ", error)
        }
    }

    const onSubmit = async (e) => {
        const commentId = id;
        e.preventDefault();
        try {
            const res = await api.patch(`v1/comment/c/${commentId}`, {
                newContent: form.newContent,
            });
            setIsEditable(false);
        } catch (error) {
            console.log(error);
            alert("Some error while adding comment");
        }


    }

    const user = useSelector((state) => state.auth.user);
    // console.log("THIS IS SELECTOR USER OBJ >> ", user);
    return (
        <div className="p-5 flex flex-col gap-2 bg-gray-950 my-5 rounded-2xl">
            <div className="user text-indigo-600">
                {owner}
            </div>
            <div className="comment text-gray-600">

                {isEditable ?
                    <form onSubmit={onSubmit}>
                        <input type="text" name="newContent" value={form.newContent} onChange={(e) => setForm({ newContent: e.target.value })} />
                        <button type="submit" className="px-3 py-1 rounded-md text-sm font-medium bg-blue-600" >
                            Submit
                        </button>
                    </form>
                    :
                    <p>
                        {form.newContent}
                    </p>
                }
            </div>
            <div className="likes flex text-white font-thin gap-6 size-14 items-center h-fit">
                <ThumbsUp onClick={handleLike} />
                <ThumbsDown onClick={handleDislike} />
            </div>
            {(user &&
                user.data?._id === owner) ? <div className="flex gap-4">

                {isEditable ?
                    <button
                        onClick={onEdit}
                        className="px-3 py-1 rounded-md text-sm font-medium bg-blue-800"
                        disabled
                    >
                        Edit
                    </button>
                    :
                    <button
                        onClick={onEdit}
                        className="px-3 py-1 rounded-md text-sm font-medium bg-blue-600"
                    >
                        Edit
                    </button>
                }
                <button
                    onClick={onDelete}
                    className="px-3 py-1 rounded-md text-sm font-medium bg-red-600"
                >
                    Delete
                </button> </div> : <div></div>}
        </div>
    )
}