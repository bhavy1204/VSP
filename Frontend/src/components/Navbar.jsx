import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';


export default function Navbar() {
    return (
        <>
            <header className='flex justify-between px-2 py-2 border-gray-500 items-center bg-gray-900'>
                <div className="static flex ml-3 gap-4 text-gray-300">
                    <div className="menu">
                        <button>
                            <MenuIcon fontSize='large' />
                        </button>
                    </div>
                    <div className="logo flex text-gray-300 items-center gap-4">
                        <YouTubeIcon fontSize='large' /> <p> MultiVerseK</p>
                    </div>
                </div>
                <div className="search border border-white rounded-xl w-1/2 px-2 py-0.5">
                    <SearchIcon className='text-white' />
                    <input type="text" className='w-[90%] focus:outline-none text-gray-300 ml-2'/>
                </div>
                <div className="actions flex items-center text-white gap-4">
                    <a href='/create'>
                        <button className='flex items-center gap-2'>
                            <AddIcon fontSize='medium' /><p>Create</p>
                        </button>
                    </a>
                    <div className="notifications">
                        <a href='/notifications'>
                            <NotificationsIcon fontSize='medium' />
                        </a>
                    </div>
                    <div className="profike">
                        <a href='/signup'>
                            <PersonIcon fontSize='medium' />
                        </a>
                    </div>
                </div>
            </header>
        </>
    )
}