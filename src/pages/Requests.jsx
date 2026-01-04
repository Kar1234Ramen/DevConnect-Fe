import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [error, setError] = useState(false);

  const handleRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      //error handler
    }
  };

  const fetchRequests = async () => {
    if (requests) return;
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data.data));
      setError(false);
    } catch (err) {
      //error handler
      setError(true);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="my-10 px-4">
      <h1 className="text-center font-bold text-2xl mb-6">Requests</h1>
      {requests?.length === 0 && !error && (
        <p className="text-center opacity-70 mt-10">
          You don't have any requests pending
        </p>
      )}
      {requests?.length > 0 && (
        <div className="flex justify-center">
          <ul className="list bg-base-100 rounded-box shadow-md w-full max-w-2xl">
            {requests.map((request) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                request.fromUserId;

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
                  <div className="flex items-center gap-4">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleRequests("rejected", _id);
                      }}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        handleRequests("accepted", request._id);
                      }}
                    >
                      Accept
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && (
        <div className="text-center flex flex-col items-center justify-center h-screen">
          <p className="text-white-500 mb-3">Failed to load requests!</p>
          <button
            className="btn bg-white text-black btn-sm"
            onClick={fetchRequests}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default Requests;
