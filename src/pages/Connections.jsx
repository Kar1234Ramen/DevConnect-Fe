import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res?.data.data));
    } catch (err) {
      //error handler
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections found</h1>;

  return (
    <div className="my-10 px-4">
      <h1 className="text-center font-bold text-2xl mb-6">Connections</h1>

      <div className="flex justify-center">
        <ul className="list bg-base-100 rounded-box shadow-md w-full max-w-2xl">
          {connections.map((connection) => {
            const { firstName, lastName, photoUrl, age, gender, about } =
              connection;

            return (
              <li key={firstName + lastName} className="list-row">
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
    </div>
  );
};

export default Connections;
