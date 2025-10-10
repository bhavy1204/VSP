import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../../axios';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../../features/authSlice';
import PlaylistContainer from './playlistContainer';

const Playlist = () => {
    const dispatch = useDispatch();

    const [playlists, setPlaylists] = useState([]);
    const { user, status } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        const fetchLikedVideos = async () => {

            if (!user?.data?._id) return;

             const userId = user?.data?._id;

            const res = await api.get(`/v1/playlist/u/getplaylist/${userId}`);

            setPlaylists(res.data.data)
            console.log("PlayList data  >> ", res)
        };
        fetchLikedVideos();
    }, [user]);


    const removePlaylistFromState = async (playlistId) => {
        try {
            const res = await api.post(`/v1/playlist/p/delete/${playlistId}`)
            toast.success("liked removed successfully")
        } catch (error) {
            console.log(error);
            alert("Some error", error);
        }
        setPlaylists((prev) => prev.filter((p) => p._id !== playlistId));
    };


    return (
        <>
            <h1 className="text-white text-3xl mx-2 my-1 border-b-1 pb-2">Your Playlists</h1>
            <PlaylistContainer playlists={playlists} onRemove={removePlaylistFromState} user={user}/>
        </>
    )
}

export default Playlist