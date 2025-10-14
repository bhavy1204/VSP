import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../features/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import api from '../../axios';


export default function Navbar({ toggleSidebar, setSearchQuery, setSearchResults }) {
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { user, status } = useSelector((state) => state.auth);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/home/videos") {
            setQuery("");
            setSearchQuery(""); // optional: clears global search query too
            setSearchResults([]); // optional: resets old search results
        }
    }, [location.pathname]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setSearchQuery(query);

        try {
            const res = await api.get(`/v1/video/search?q=${encodeURIComponent(query)}`);
            console.log("Search response >>> ", res)
            setSearchResults(res.data.data || []);
            navigate("/home/search"); // route to SearchResults
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <>
            <header className='flex justify-between px-2 py-2 border-gray-500 items-center bg-gray-900'>
                <div className="static flex ml-3 gap-4 text-gray-300">
                    <div className="menu " onClick={toggleSidebar} >
                        <button>
                            <MenuIcon fontSize='large' />
                        </button>
                    </div>
                    <div className="logo flex text-gray-300 items-center gap-4" onClick={() => navigate("/home/videos")}>
                        <YouTubeIcon fontSize='large' /> <p> MultiVerse</p>
                    </div>
                </div>
                <div className="search border border-white rounded-xl w-1/2 px-2 py-0.5">
                    <form onSubmit={handleSearch} className="search rounded-xl w-full px-2 py-0.5 flex items-center">
                        <SearchIcon className='text-white' />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search videos..."
                            className=" w-full focus:outline-none text-gray-300 ml-2 bg-transparent"
                        />
                    </form>
                </div>
                <div className="actions flex items-center text-white gap-4">
                    <a href={`${user ? '/create' : '/signup'}`}>
                        <button className='flex items-center gap-2'>
                            <AddIcon fontSize='medium' /><p>Create</p>
                        </button>
                    </a>
                    <div className="notifications">
                        <a href={`${user ? '/notification' : '/signup'}`}>
                            <NotificationsIcon fontSize='medium' />
                        </a>
                    </div>
                    <div className="profike">
                        <a href={`${user ? '/dashboard/user' : '/signup'}`}>
                            {/* {console.log("THIS IS THE USER FROM NAVBAR >> ", user)} */}
                            {user ?
                                <img src={user.data.avatar} alt="" className='h-10 rounded-full w-10' />
                                :
                                <PersonIcon fontSize='medium' />}
                        </a>
                    </div>
                </div>
            </header>
        </>
    )
}