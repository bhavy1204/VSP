import { useState, useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Signup() {
    const [filename, setFilename] = useState("Upload Pfp");
    const [coverFile, setCoverFilename] = useState("Upload Cover");
    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const fileInputChange = (e) => {
        if (e.target.files.length > 0) {
            setFilename(e.target.files[0].name);
        } else {
            setFilename('Upload pfp')
        }
    }

    const CoverInputChange = (e) => {
        if (e.target.files.length > 0) {
            setCoverFilename(e.target.files[0].name);
        } else {
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
                    <p className="text-center text-sm mt-1 mb-5">signup to continue</p>

                    <form action="" method="post" className="flex flex-col items-center gap-5 w-1/2" onSubmit={(e) => e.preventDefault()}>

                        <input type="text" placeholder="name" className="w-full border-b-1 px-2 py-1" />
                        <input type="text" placeholder="username" className="w-full border-b-1 px-2 py-1" />
                        <input type="email" placeholder="email" className="w-full border-b-1 px-2 py-1" />

                        <button type="button" className="w-full border-b-1 px-2 py-1 text-left " onClick={handlePfpButtonClick}>
                            <span className="text-gray-500">{filename}</span>
                        </button>
                        <input type="file" ref={fileInputRef} onChange={fileInputChange} id="hiddenFileInput" className="hidden" name="pfp" />

                        <button type="button" className="w-full border-b-1 px-2 py-1 text-left " onClick={handleCoverButtonClick}>
                            <span className="text-gray-500">{coverFile}</span>
                        </button>
                        <input type="file" ref={coverInputRef} onChange={CoverInputChange} id="hiddenFileInput" className="hidden" name="cover" />

                        <input type="text" placeholder="password" className="w-full border-b-1 px-2 py-1" />


                        <div className="actions flex w-full justify-between px-2 ">
                            <button type="button" className=" text-sm text-blue-600">
                                forgot password?
                            </button>

                            <button type="submit" className="bg-green-700 px-3 text-lg rounded-md text-gray-200">
                                Signup
                            </button>

                        </div>

                    </form>

                    <div className="SSO">

                    </div>



                </div>
            </div>
        </>
    )
}