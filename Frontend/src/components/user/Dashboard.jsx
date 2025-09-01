import UserDashboardSideBar from "./UserDashboardSideBar.jsx";
import UserVideo from "./UserVideo.jsx"
import UserNav from "./UserNav.jsx";

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-col h-screen">
                <UserNav/>
                <div className="flex flex-1 overflow-hidden no-scrollbar">
                    <UserDashboardSideBar/>
                    <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
                        <UserVideo />
                    </div>
                </div>
            </div>
        </>
    )
}