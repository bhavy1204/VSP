import { createContext, useContext } from "react";

const VideoContext = createContext();

export const useVideos = () => useContext(VideoContext);

export const VideoProvider = ({ childern, value }) => {
    return (
        <VideoContext.Provider value={value}>
            {childern}
        </VideoContext.Provider>
    )
}