import axios from "axios";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../axios";
import { setUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {

    const [form, setForm] = useState({ username: "", password: "", email: "" });

    const { user, status } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const res = await api.post("/v1/users/login", {
                "email": form.email,
                "password": form.password,
                "username": form.username,
            });

            console.log("User => ", res.data.data.user);

            localStorage.setItem("user", JSON.stringify(res.data.data.user));

            dispatch(setUser(res.data.data.user));
            console.log("Dispatched user:", user);
            console.log("Dispatched status:", status);

            navigate("/home/videos")

        } catch (error) {
            console.log(error);
            alert("Some error while login. Please try in few minutes");
        }

    }

    return (
        <>
            <div className="container grid place-items-center h-screen">
                <div className="form flex flex-col items-center bg-gray-200 w-1/2 py-4 rounded-2xl">
                    <h1 className="text-center text-4xl font-bold text-blue-800 mt-2">Login</h1>
                    <p className="text-center text-sm mt-1 mb-5">Welcome back</p>

                    <form action="" method="post" className="flex flex-col items-center gap-5 w-1/2" onSubmit={handleLogin}>

                        <input type="email" placeholder="email" name="email" className="w-full border-b-1 px-2 py-1 focus:outline-none" autoComplete="off" onChange={handleChange} />

                        <input type="text" placeholder="username" name="username" className="w-full border-b-1 px-2 py-1 focus:outline-none" autoComplete="off" onChange={handleChange} />

                        <input type="text" placeholder="password" name="password" className="w-full border-b-1 px-2 py-1 focus:outline-none" autoComplete="off" onChange={handleChange} />

                        <div className="actions flex w-full justify-between px-2 ">
                            <button type="button" className=" text-sm text-blue-600">
                                forgot password?
                            </button>

                            <button type="submit" className="bg-green-700 px-3 text-lg rounded-md text-gray-200">
                                login
                            </button>

                        </div>

                        <div className="signup flex flex-col items-center text-sm">
                            <p>Don't have a account ?</p>
                            <a href="/signup" className="text-blue-600">Signup here</a>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}