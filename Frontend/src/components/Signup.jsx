import { useState, useRef, use } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function Signup({setUser}) {

    const [avatarName, setFilename] = useState("Upload Pfp");
    const [coverImageName, setCoverFilename] = useState("Upload Cover");
    const [avatar, setAvatar] = useState("Upload Cover");
    const [coverImage, setCoverImage] = useState("Upload Cover");
    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);

    // google callback
    const handleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/auth/google/callback", {
                token: credentialResponse.credential,
            });
            console.log("Logged in:", res.data);
        } catch (err) {
            console.error("Login failed:", err);
        }
    }

    // Form submit redirect
    const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const SignupSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("coverImage", coverImage);
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("email", form.email);
        formData.append("fullName", form.fullName);


        try {
            const res = await axios.post("http://localhost:3000/api/v1/users/register", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log(res);

            setUser(res.data)

            navigate("/login")
        } catch (error) {
            console.log(error);
            alert("Something failed. Please try again in few minutes")
        }
    }

    const fileInputChange = (e) => {
        if (e.target.files.length > 0) {
            setFilename(e.target.files[0].name);
            setAvatar(e.target.files[0]);
        } else {
            setAvatar(null);
            setFilename('Upload pfp')
        }
    }

    const CoverInputChange = (e) => {
        if (e.target.files.length > 0) {
            setCoverFilename(e.target.files[0].name);
            setCoverImage(e.target.files[0])
        } else {
            setCoverImage(null);
            setCoverFilename('Upload cover')
        }
    }

    const handlePfpButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleCoverButtonClick = () => {
        coverInputRef.current.click();
    }


    return (
        <>
            <div className="container grid place-items-center h-screen">
                <div className="form flex flex-col items-center bg-gray-200 w-1/2 py-4 rounded-2xl">
                    <h1 className="text-center text-4xl font-bold text-blue-800 mt-2">Signup</h1>
                    <p className="text-center text-sm mt-1 mb-2">signup to continue</p>
                    <div className="signup flex gap-2 text-sm items-center mb-3">
                        <p>Already have account ?</p>
                        <a href="/login" className="text-blue-600">login here</a>
                    </div>

                    <form action="" method="post" className="flex flex-col items-center gap-5 w-1/2" onSubmit={SignupSubmit}>

                        <input type="text" placeholder="name" name="fullName" className="w-full border-b-1 px-2 py-1 focus:outline-none" autoComplete="off" onChange={handleChange} />
                        <input type="text" placeholder="username" name="username" className="w-full border-b-1 px-2 py-1 focus:outline-none" autoComplete="off" onChange={handleChange} />
                        <input type="email" placeholder="email" name="email" className="w-full border-b-1 px-2 py-1 focus:outline-none" autoComplete="off" onChange={handleChange} />

                        <button type="button" className="w-full border-b-1 px-2 py-1 text-left " onClick={handlePfpButtonClick}>
                            <span className="text-gray-500">{avatarName}</span>
                        </button>
                        <input type="file" ref={fileInputRef} onChange={fileInputChange} id="hiddenFileInput" className="hidden" name="avatar" />

                        <button type="button" className="w-full border-b-1 px-2 py-1 text-left " onClick={handleCoverButtonClick}>
                            <span className="text-gray-500">{coverImageName}</span>
                        </button>
                        <input type="file" ref={coverInputRef} onChange={CoverInputChange} id="hiddenFileInput" className="hidden" name="coverImage" />

                        <input type="text" placeholder="password focus:outline-none" autoComplete="off" name="password" className="w-full border-b-1 px-2 py-1" onChange={handleChange} />


                        <div className="actions flex w-full justify-between px-2 ">
                            <button type="button" className=" text-sm text-blue-600">
                                forgot password?
                            </button>

                            <button type="submit" className="bg-green-700 px-3 text-lg rounded-md text-gray-200">
                                Signup
                            </button>

                        </div>

                        <GoogleLogin onSuccess={handleSuccess}
                            onError={() => console.log("Login Failed")} />

                    </form>
                </div>
            </div>
        </>
    )
}