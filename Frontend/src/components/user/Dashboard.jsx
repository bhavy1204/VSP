import UserDashboardSideBar from "./UserDashboardSideBar.jsx";
import Navbar from "../Home/Navbar.jsx";
import { useState } from "react";
import { Outlet } from "react-router-dom"
import {VideoProvider} from "./VideoProvider.jsx";

export default function Dashboard({ user }) {

    const [historyVideos, setHistoryVideos] = useState([]);

    return (
        <>
            {/* <VideoProvider value={{historyVideos, setHistoryVideos}}> */}
                <div className="flex flex-col h-screen">
                    <Navbar user={user} />
                    <div className="flex flex-1 overflow-hidden no-scrollbar">
                        <UserDashboardSideBar history={setHistoryVideos} />
                        <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
                            <Outlet />
                        </div>
                    </div>
                </div>
            {/* </VideoProvider> */}
        </>
    )
}