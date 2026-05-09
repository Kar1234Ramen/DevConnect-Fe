import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connections = useSelector((store) => store.connections);
  const [error, setError] = useState(false);

  const fetchConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data.data));
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="my-10 px-4">
      <h1 className="text-center font-bold text-3xl mb-8">Your Connections</h1>

      {/* Empty state */}
      {connections?.length === 0 && !error && (
        <p className="text-center opacity-70 mt-10">
          You don't have any connections yet 👋
        </p>
      )}

      {/* List */}
      {connections?.length > 0 && (
        <div className="flex justify-center">
          <ul className="bg-base-100 rounded-xl shadow-lg w-full max-w-2xl divide-y">
            {connections.map((connection) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                connection;

              return (
                <li
                  key={_id}
                  className="flex items-center gap-4 p-4 hover:bg-base-200 transition"
                >
                  {/* Avatar */}
                  <img
                    alt="photo"
                    className="w-12 h-12 rounded-full object-cover"
                    src={photoUrl}
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <div className="font-semibold text-base">
                      {firstName} {lastName}
                    </div>

                    {(age || gender) && (
                      <div className="text-xs opacity-70">
                        {age} {age && gender && "•"} {gender}
                      </div>
                    )}

                    <p className="text-xs opacity-80 mt-1 line-clamp-2">
                      {about}
                    </p>
                  </div>

                  {/* Chat Button */}
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/chat/${_id}`)}
                  >
                    Chat
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center flex flex-col items-center justify-center h-[50vh]">
          <p className="mb-3 text-error">Failed to load connections!</p>
          <button className="btn btn-sm btn-outline" onClick={fetchConnections}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default Connections;
