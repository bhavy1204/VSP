import UserDashboardSideBar from "./UserDashboardSideBar.jsx";
import UserVideo from "./MyVideos/UserVideo.jsx"
import Navbar from "../Home/Navbar.jsx";
import { useState } from "react";
import { Outlet } from "react-router-dom"

export default function Dashboard({user}) {

    const [history, setHistory] = useState(localStorage.getItem("user")?.watchHistory || null);

    return (
        <>
            <div className="flex flex-col h-screen">
                <Navbar user={user}/>
                <div className="flex flex-1 overflow-hidden no-scrollbar">
                    <UserDashboardSideBar history={history}/>
                    <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
                        <Outlet context={{history }}/>
                    </div>
                </div>
            </div>
        </>
    )
}