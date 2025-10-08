import React, { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="pt-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="pt-2 pb-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
