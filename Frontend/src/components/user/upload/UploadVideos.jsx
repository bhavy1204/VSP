import { useRef, useState} from "react";
import api from "../../../axios";
import { setUser } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function UploadVideos() {

    const navigate = useNavigate();
    const [videoName, setVideoName] = useState("upload video");
    const [video, setVideo] = useState("upload video");
    const [thumbnailName, setThumbnailName] = useState("Upload thubnail");
    const [thumbnail, setThumbnail] = useState("upload thumbnail");
    const videoInputRef = useRef(null)
    const thumbnailInputRef = useRef(null)

    const [form, setForm] = useState({ title: "", description: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("video", video);
        formData.append("thumbnail", thumbnail);
        formData.append("title", form.title);
        formData.append("description", form.description);

        try {
            const res = await api.post("/v1/video/v1/upload", formData, { headers: { "Content-Type": "multipart/form-data" } })

            console.log(res);

            setUser(res.data);

            navigate("/dashboard/myVideos")

        } catch (error) {
            console.log(error);
            alert("Something went wrong while uploadinng")
        }

    }

    const videoInputChange = (e) => {
        if (e.target.files.length > 0) {
            setVideoName(e.target.files[0].name);
            setVideo(e.target.files[0]);
        } else {
            setVideo(null);
            setVideoName('Upload Video')
        }
    }

    const thumbnailInputChange = (e) => {
        if (e.target.files.length > 0) {
            setThumbnailName(e.target.files[0].name);
            setThumbnail(e.target.files[0]);
        } else {
            setThumbnailName('upload Thumbnail');
            setThumbnail(null);
        }
    }

    const handleVideoButtonClick = () => {
        videoInputRef.current.click();
    }

    const handlethumbnailButtonClick = () => {
        thumbnailInputRef.current.click();
    }

    return (
        <div className="h-full">
            <h1 className="text-white font-bold text-2xl mx-auto flex justify-center">Upload your creativity</h1>
            <form action="" onSubmit={handleUpload} className="bg-gray-300 rounded-3xl h-2/3 w-2/3 mx-auto mt-20 flex flex-col px-5 py-5 items-center">
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full my-3 border-b-1 px-2 py-1 text-left "
                    onChange={handleChange}
                    placeholder="title"
                />
                <input
                    type="text"
                    id="description"
                    name="description"
                    className="w-full my-3 border-b-1 px-2 py-1 text-left "
                    onChange={handleChange}
                    placeholder="description"
                />

                <button
                    type="button"
                    className="w-full border-b-1 px-2 py-1 text-left my-3 "
                    onClick={handleVideoButtonClick}>
                    <span className="text-gray-500">{videoName}</span>
                </button>
                <input
                    type="file"
                    ref={videoInputRef}
                    onChange={videoInputChange}
                    id="hiddenFileInput"
                    className="hidden"
                    name="video" />

                <button
                    type="button"
                    className="w-full border-b-1 px-2 py-1 text-left my-3" onClick={handlethumbnailButtonClick}>
                    <span className="text-gray-500">{thumbnailName}</span>
                </button>
                <input
                    type="file"
                    ref={thumbnailInputRef}
                    onChange={thumbnailInputChange}
                    id="hiddenFileInput"
                    className="hidden"
                    name="thumbnail" />
                <button
                    className="bg-green-700 text-white rounded-md py-2 px-8">Upload
                </button>
            </form>
        </div>
    )
} 