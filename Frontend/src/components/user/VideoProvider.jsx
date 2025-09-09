import { createContext, useContext , useState} from "react";

const VideoContext = createContext();

export const useVideos = () => useContext(VideoContext);


export const VideoProvider = ({ children, value }) => {

    const [videos, setVideos] = useState({
        myVideos: [],
        historyVideos: [],
        likedVideos: [],
        savedVideos: [],
    });

    const updateVideos = (type, newVideos) => {
        setVideos(prev => ({ ...prev, [type]: newVideos }));
    };

    return (
        <VideoContext.Provider value={{videos,updateVideos}}>
            {children}
        </VideoContext.Provider>
    )
}