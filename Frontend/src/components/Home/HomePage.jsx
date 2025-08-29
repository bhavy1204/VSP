import CardGrid from "./CardGrid"
import Navbar from "../Navbar"
import SideBar from "../SideBar"

export default function HomePage() {
    return (
        <>
            <div className="flex flex-col h-screen">
                <Navbar />
                <div className="flex flex-1 overflow-hidden no-scrollbar">
                        <SideBar />
                    <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
                        <CardGrid />
                    </div>
                </div>
            </div>
        </>
    )
}