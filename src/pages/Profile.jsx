import React, { useEffect, useContext, useState } from "react";
import ProfilePictureUpdate from "../components/ProfilePictureUpdater";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import formatDataForActivity from "../utils/formatDataForActivity";
import useAxios from "../utils/useAxios";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import TopNavigation from "../components/TopNavigation";
import secondsFormat from "../utils/secondsFormat";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import AttendanceCalendar from "../components/AttendanceCalendar";
import UserTimeGraph from "../components/UserTimeGraph";
import UserVroomvoltsGraph from "../components/UserVroomvoltsGraph";

export default function Profile() {
    const api = useAxios();
    const [userProfile, setUserProfile] = useState(null);
    const { id } = useParams(); // Get the user id from the URL
    const [response, setResponse] = useState(null);
    const [passwordResponse, setPasswordResponse] = useState(null);
    const { user, logoutUser } = useContext(AuthContext);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [userLabSessions, setUserLabSessions] = useState(null);
    const navigate = useNavigate();
    const formatedDataForActivity = formatDataForActivity(userLabSessions);
    useEffect(() => {
        // Fetch the specific user by ID
        if (!id) return;
        api.get(`/users/${id}`)
            .then((response) => {
                if (response.data) {
                    setUserProfile(response.data);
                }
            })
            .catch((error) => {
                if (error.status === 404) {
                    // Redirect to the home page if the user is not found
                    navigate("/error");
                }
            });
        api.get(`labsessions/user/${id}`).then((response) => {
            if (response.data) {
                setUserLabSessions(response.data);
            }
        });
    }, [id]); // Refetch when the id changes

    const handleSubmit = async (e) => {
        e.preventDefault();

        await api.put(`/users/${id}/`, {
            first_name: e.target.firstName.value,
            last_name: e.target.lastName.value,
            old_password: e.target.oldPasswordUser.value, // Send the old password
        });

        setResponse("Profile updated successfully!");
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (e.target.password.value !== e.target.confirmPassword.value) {
            setPasswordResponse("Passwords do not match.");
            return;
        }

        try {
            // Make a PUT request to update the user's password
            await api
                .put(`/users/${id}/`, {
                    old_password: e.target.oldPassword.value, // Send the old password
                    password: e.target.password.value, // Send the new password
                })
                .then((res) => {
                    setPasswordResponse("Password updated successfully!");
                    console.log(res.data);
                });
        } catch (error) {
            setPasswordResponse("Password update failed");
        }
    };
    if (!userProfile) {
        return <div>Loading...</div>; // Show a loading state while data is being fetched
    }

    return (
        <div className="flex justify-center items-start w-full h-5/6 md:flex-col md:items-center flex-wrap">
            <TopNavigation />
            <AttendanceCalendar data={formatedDataForActivity} />
            <div className="flex flex-col justify-evenly w-1/4 p-4 h-96 mt-8 rounded-xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] mx-4 items-center mb-4 bg-[#190C34] md:pt-4 md:w-11/12 md:p-0 md:mt-4 order-2 md:order-1">
                <img
                    src={userProfile.image}
                    alt="Profile"
                    className="w-36 h-36 rounded-full"
                />
                <h2 className="text-2xl">@{userProfile.username}</h2>
                <h2 className="text-xl">
                    {userProfile.first_name} {userProfile.last_name}
                </h2>
                <p>Total time: {secondsFormat(userProfile.total_time)}</p>

                {userProfile.id === user.user_id && (
                    <div className="flex">
                        <button
                            onClick={() => setUpdateProfile((prev) => !prev)}
                            className="bg-purple-500 text-white p-2 rounded-lg mx-1"
                        >
                            Update Profile
                        </button>
                        <button
                            onClick={() =>
                                document
                                    .getElementById("logoutModal")
                                    .showModal()
                            }
                            className="bg-red-500 text-white p-2 rounded-lg mx-1"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
            {!updateProfile && <UserTimeGraph data={userLabSessions} />}
            {!updateProfile && <UserVroomvoltsGraph userId={id} />}
            <Modal
                id="logoutModal"
                title={"Logout?"}
                content={"Are you sure you want to log out?"}
                clickFunction={logoutUser}
            />

            {/* Show profile update button only for logged-in user */}
            {userProfile.id === user.user_id && updateProfile && (
                <div className="flex w-full flex-col h-full justify-center items-center md:pb-16 md:justify-evenly md:items-center backdrop-blur-lg z-20 absolute top-0 bg-[#0006] md:w-full md:h-full min-h-fit">
                    <ProfilePictureUpdate />
                    <div className="flex w-1/3 justify-between h-fit md:flex-col md:h-full md:w-11/12 ">
                        <form
                            className="form-control bg-[#190C34] m-2 w-full flex justify-center items-center flex-col py-4 rounded-xl md:m-0 md:mt-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
                            onSubmit={handleSubmit}
                        >
                            <h2 className="text-2xl mb-2">Update Profile</h2>
                            <label className="input input-bordered flex items-center gap-2 my-1 w-11/12 bg-[#1D232A]">
                                <MdDriveFileRenameOutline />
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    defaultValue={userProfile.first_name}
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-1 w-11/12 bg-[#1D232A]">
                                <MdDriveFileRenameOutline />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    defaultValue={userProfile.last_name}
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mt-5 w-11/12 bg-[#1D232A]">
                                <FaKey />
                                <input
                                    type="password"
                                    name="oldPasswordUser"
                                    placeholder="Password"
                                />
                            </label>

                            <button
                                type="submit"
                                className="w-9/12 mt-2 bg-purple-600"
                            >
                                Update Profile
                            </button>
                            {response && <p>{response}</p>}
                        </form>
                        <form
                            className="form-control bg-[#190C34] m-2 w-full flex justify-center items-center flex-col py-4 rounded-xl md:m-0 md:mt-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
                            onSubmit={handlePasswordSubmit}
                        >
                            <h2 className="text-2xl mb-2">Change Password</h2>

                            <label className="input input-bordered flex items-center gap-2 my-1 bg-[#1D232A]">
                                <MdDriveFileRenameOutline />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="New Password"
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-1 bg-[#1D232A]">
                                <MdDriveFileRenameOutline />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm New Password"
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mt-5 bg-[#1D232A]">
                                <FaKey />
                                <input
                                    type="password"
                                    name="oldPassword"
                                    placeholder="Old Password"
                                />
                            </label>

                            <button
                                type="submit"
                                className="w-9/12 mt-2 bg-purple-600"
                            >
                                Update Password
                            </button>
                            {passwordResponse && <p>{passwordResponse}</p>}
                        </form>
                    </div>
                    <button
                        onClick={() => setUpdateProfile((prev) => !prev)}
                        className="bg-pink-500 text-white p-2 rounded-lg mx-1 md:mt-12"
                    >
                        Close Profile Updater
                    </button>
                </div>
            )}
        </div>
    );
}
