import { useContext } from "react"
import VideoCard from "../../Home/Videos/Videocard";
import CardGrid from "../../Home/Videos/CardGrid";
import { Outlet } from "react-router-dom";

export default function History() {
    const { history } = useContext();
    return (
        <>
            <Outlet></Outlet>
        </>
    )
}