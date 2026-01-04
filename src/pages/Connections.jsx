import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [error, setError] = useState(false);

  const fetchConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res?.data.data));
      setError(false);
    } catch (err) {
      //error handler
      setError(true);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="my-10 px-4">
      <h1 className="text-center font-bold text-2xl mb-6">Connections</h1>
      {connections?.length === 0 && !error && (
        <p className="text-center opacity-70 mt-10">
          You don't have any connections yet 👋
        </p>
      )}
      {connections?.length > 0 && (
        <div className="flex justify-center">
          <ul className="list bg-base-100 rounded-box shadow-md w-full max-w-2xl">
            {connections.map((connection) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                connection;

              return (
                <li key={_id} className="list-row">
                  <div>
                    <img
                      alt="photo"
                      className="size-10 rounded-box"
                      src={photoUrl}
                    />
                  </div>

                  <div>
                    <div className="uppercase font-semibold">
                      {firstName} {lastName}
                    </div>
                    {(age || gender) && (
                      <div className="text-xs opacity-70">
                        {age}, {gender}
                      </div>
                    )}
                  </div>

                  <p className="list-col-wrap text-xs opacity-80">{about}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && (
        <div className="text-center flex flex-col items-center justify-center h-screen">
          <p className="text-white-500 mb-3">Failed to load connections!</p>
          <button
            className="btn bg-white text-black btn-sm"
            onClick={fetchConnections}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default Connections;
