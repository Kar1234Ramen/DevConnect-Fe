import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data));
    } catch (err) {
      //error handler
      setError(true);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div>
      {feed.length == 0 && (
        <div className="flex justify-center my-10">
          <h1>No new users found!</h1>
        </div>
      )}

      {feed.length > 0 && (
        <div className="flex justify-center my-10">
          <UserCard user={feed[0]} />
        </div>
      )}

      {error && (
        <div className="text-center flex flex-col items-center justify-center h-screen">
          <p className="text-white-500 mb-3">Failed to load feed!</p>
          <button className="btn bg-white text-black btn-sm" onClick={getFeed}>
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default Feed;
