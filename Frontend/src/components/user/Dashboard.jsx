import UserDashboardSideBar from "./UserDashboardSideBar.jsx";
import Navbar from "../Home/Navbar.jsx";
import { Outlet } from "react-router-dom"
import {VideoProvider} from "./VideoProvider.jsx";

export default function Dashboard({ user }) {

    return (
        <>
            <VideoProvider>
                <div className="flex flex-col h-screen">
                    <Navbar user={user} />
                    <div className="flex flex-1 overflow-hidden no-scrollbar">
                        <UserDashboardSideBar />
                        <div className="flex-1 overflow-y-auto no-scrollbar">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </VideoProvider>
        </>
    )
}