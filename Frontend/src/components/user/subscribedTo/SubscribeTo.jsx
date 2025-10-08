import React from 'react'
import UserCardGrid from "../Videos/UserCardGrid.jsx";
import { useVideos } from "../VideoProvider";
import { useEffect, useState } from "react";
import api from "../../../axios.js";
import SubscribeToContainer from './subscribeToContainer.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../../features/authSlice.js';
import toast from 'react-hot-toast';

const SubscribeTo = () => {
  const dispatch = useDispatch();

  const [channels, updateChannels] = useState([]);
  const { user, status } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {

    if (!user?.data?._id) return;

    const fetchSubscription = async () => {
      // const user = JSON.parse(localStorage.getItem("user"));
      console.log("USER ", user)
      const subscriberId = user?.data?._id;
      const res = await api.get(`/v1/subscription/u/getSubscribed/${subscriberId}`);
      console.log("SUBSCRIBE DATA >> ", res)
      updateChannels(res.data.data.channels)
    };
    fetchSubscription();
  }, [user]);

  const removeChannelFromState = async (channelId) => {
    try {
      const res = await api.post(`/v1/subscription/toggleSubscribe/${channelId}`)
      // console.log("This is subscribe toogle res --- ", res);
      toast.success("Unsubscribed successfully")
    } catch (error) {
      console.log(error);
      alert("Some error", error);
    }
    updateChannels((prev) => prev.filter((v) => v._id !== channelId));
  };

  return (
    <>
      <h1 className="text-white text-3xl mx-2 my-1 border-b-1 pb-2">Your Subscriptions</h1>
      <SubscribeToContainer channelList={channels} onUnsubscribe={removeChannelFromState} />

    </>
  )
}

export default SubscribeTo