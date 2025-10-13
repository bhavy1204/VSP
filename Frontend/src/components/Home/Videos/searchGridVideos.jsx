import CardGrid from "./CardGrid";
import { useOutletContext } from "react-router-dom";

export default function SearchGridVideos() {
    const { searchResults } = useOutletContext();
    return <CardGrid videos={searchResults} />;
}
