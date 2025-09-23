import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../features/authSlice';
import { useEffect } from 'react';
import api from '../../axios';
import { useState } from 'react';


export const UserChannel = () => {

    const [subscribers, setSubscribers] = useState("");
    const [channel, setChannel] = useState("");
    const [avatar, setAvatar] = useState("");
    const [cover, setCover] = useState("");

    const dispatch = useDispatch();
    const { user, status } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        const getSubscribers = async () => {
            try {
                const res = await api.get(`v1/users/c/${user?.data?.username}`);
                console.log(res);
                setSubscribers(res.data.data.subcribersCount)
                setChannel(res.data.data.username)
                setAvatar(res.data.data.avatar)
                setCover(res.data.data.coverImage)
            } catch (error) {
                console.log("USER ERROR ", error)
            }
        }
        getSubscribers()
    }, [user]);

    return (
        <div className='bg-gray-700 h-screen'>
            <div className="images">
                <div className="relative w-full h-64 bg-gray-200 mb-32">
                    {/* Cover Image */}
                    <img
                        src={cover}
                        alt="Cover"
                        className="w-full h-48 object-cover"
                    />

                    {/* Avatar */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-24">
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="w-48 h-48 rounded-full object-cover"
                        />
                    </div>
                </div>
            </div>
            <div className="channel-data flex items-center flex-col">
                <h1 className='text-white w-full text-center text-6xl'>
                    {channel}
                </h1>
                <div className="data flex justify-between">
                    <div className=" bg-gray-300 m-3 py-2 px-3 rounded-md">
                        <h1>
                            Subscribers {subscribers}
                        </h1>
                    </div>
                    <div className=" bg-gray-300 m-3 py-2 px-3 rounded-md">
                        <button>
                            Subscribe
                        </button>
                    </div>
                </div>

            </div>


        </div>
    )
}
