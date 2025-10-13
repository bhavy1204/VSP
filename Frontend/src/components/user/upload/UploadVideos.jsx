import { useRef, useState } from "react";
import api from "../../../axios";
import { setUser } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function UploadVideos() {

    const navigate = useNavigate();
    const [videoName, setVideoName] = useState("Upload video");
    const [video, setVideo] = useState(null);
    const [thumbnailName, setThumbnailName] = useState("Upload thumbnail");
    const [thumbnail, setThumbnail] = useState(null);
    const videoInputRef = useRef(null);
    const thumbnailInputRef = useRef(null);

    const [form, setForm] = useState({ title: "", description: "", tags: [] });
    const [tagsInput, setTagsInput] = useState(""); // temporary input field for tags

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleTagsChange = (e) => {
        setTagsInput(e.target.value);
    }

    const handleAddTags = () => {
        if (tagsInput.trim()) {
            setForm(prev => ({
                ...prev,
                tags: [...prev.tags, tagsInput.trim()]
            }));
            setTagsInput("");
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!form.title || !form.description) {
            alert("Title and description are required");
            return;
        }

        const formData = new FormData();
        formData.append("video", video);
        formData.append("thumbnail", thumbnail);
        formData.append("title", form.title);
        formData.append("description", form.description);
        form.tags.forEach(tag => formData.append("tags[]", tag));

        try {
            const res = await api.post("/v1/video/v1/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log(res);
            setUser(res.data);
            navigate("/dashboard/myVideos");

        } catch (error) {
            console.log(error);
            alert("Something went wrong while uploading");
        }
    }

    const videoInputChange = (e) => {
        if (e.target.files.length > 0) {
            setVideoName(e.target.files[0].name);
            setVideo(e.target.files[0]);
        } else {
            setVideo(null);
            setVideoName('Upload Video');
        }
    }

    const thumbnailInputChange = (e) => {
        if (e.target.files.length > 0) {
            setThumbnailName(e.target.files[0].name);
            setThumbnail(e.target.files[0]);
        } else {
            setThumbnail(null);
            setThumbnailName('Upload Thumbnail');
        }
    }

    const handleVideoButtonClick = () => {
        videoInputRef.current.click();
    }

    const handleThumbnailButtonClick = () => {
        thumbnailInputRef.current.click();
    }

    return (
        <div className="h-full">
            <h1 className="text-white font-bold text-2xl mx-auto flex justify-center">Upload your creativity</h1>
            <form onSubmit={handleUpload} className="bg-gray-300 rounded-3xl h-2/3 w-2/3 mx-auto mt-20 flex flex-col px-5 py-5 items-center">
                
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full my-3 border-b-1 px-2 py-1 text-left"
                    onChange={handleChange}
                    placeholder="Title"
                />

                <input
                    type="text"
                    id="description"
                    name="description"
                    className="w-full my-3 border-b-1 px-2 py-1 text-left"
                    onChange={handleChange}
                    placeholder="Description"
                />

                {/* Tags input */}
                <div className="w-full my-3 flex gap-2">
                    <input
                        type="text"
                        value={tagsInput}
                        onChange={handleTagsChange}
                        placeholder="Add a tag"
                        className="flex-grow border-b-1 px-2 py-1"
                    />
                    <button type="button" onClick={handleAddTags} className="bg-blue-600 text-white px-3 rounded-md">Add</button>
                </div>

                {/* Display added tags */}
                <div className="w-full flex flex-wrap gap-2 mb-3">
                    {form.tags.map((tag, idx) => (
                        <span key={idx} className="bg-gray-500 text-white px-2 py-1 rounded-full text-sm">{tag}</span>
                    ))}
                </div>

                <button type="button" className="w-full border-dashed border rounded-lg bg-gray-400 px-2 py-1 text-left my-3 " onClick={handleVideoButtonClick}>
                    <span className="text-white">{videoName}</span>
                </button>
                <input type="file" ref={videoInputRef} onChange={videoInputChange} className="hidden" name="video" />

                <button type="button" className="w-full border-dashed border rounded-lg bg-gray-400 px-2 py-1 text-left my-3 " onClick={handleThumbnailButtonClick}>
                    <span className="text-white">{thumbnailName}</span>
                </button>
                <input type="file" ref={thumbnailInputRef} onChange={thumbnailInputChange} className="hidden" name="thumbnail" />

                <button className="bg-green-700 text-white rounded-md py-2 px-8 mt-4">Upload</button>
            </form>
        </div>
    );
}