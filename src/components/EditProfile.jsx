import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [emailId, setEmailId] = useState(user.emailId);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills.join(", "));
  const [error, setError] = useState("");
  const [toast, SetToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    const skillsArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills: skillsArray,
          emailId,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      SetToast(true);
      const intrvl = setTimeout(() => {
        SetToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-start my-10 gap-10">
      <div className="flex justify-center items-start mx-10 px-4">
        <div className="card bg-base-300 w-full max-w-sm shadow-md">
          <div className="card-body py-6">
            <h2 className="card-title justify-center mb-4">Edit Profile</h2>
            {/* First Name */}
            <div className="mb-2">
              <label className="form-control w-full">
                <span className="label-text text-sm">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered input-sm"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </div>
            {/* Last Name */}
            <div className="mb-2">
              <label className="form-control w-full">
                <span className="label-text text-sm">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered input-sm"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
            {/* Email */}
            <div className="mb-2">
              <label className="form-control w-full">
                <span className="label-text text-sm">Email ID</span>
                <input
                  type="email"
                  value={emailId}
                  className="input input-bordered input-sm"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
            </div>
            {/* Photo URL */}
            <div className="mb-2">
              <label className="form-control w-full">
                <span className="label-text text-sm">Photo URL</span>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered input-sm"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
            </div>
            {/* Gender */}
            <div className="mb-2">
              <label className="form-control w-full">
                <span className="label-text text-sm">Gender</span>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered input-sm"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
            </div>
            {/* Age */}
            <div className="mb-2">
              <label className="form-control w-full">
                <span className="label-text text-sm">Age</span>
                <input
                  type="number"
                  value={age}
                  className="input input-bordered input-sm"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
            </div>
            {/* About */}
            <div className="mb-2">
              <label className="form-control w-full">
                <span className="label-text text-sm">About</span>
                <textarea
                  value={about}
                  rows={3}
                  className="textarea textarea-bordered textarea-sm"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>
            {/* Skills */}
            <div className="mb-4">
              <label className="form-control w-full">
                <span className="label-text text-sm">Skills</span>
                <textarea
                  value={skills}
                  rows={2}
                  className="textarea textarea-bordered textarea-sm"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </label>
            </div>
            {/* Save Button */}
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary btn-sm px-6"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
      <div className="h-fit self-start">
        <UserCard
          user={{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
            emailId,
          }}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
