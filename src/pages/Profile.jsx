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
        <div className="flex justify-center items-center w-full h-full md:flex-col ">
            <TopNavigation />
            <div className="flex flex-col justify-center items-center mb-4 md:pt-4 md:w-full">
                <img
                    src={userProfile.image}
                    alt="Profile"
                    className="w-32 h-32 rounded-full"
                />
                <h2 className="text-2xl">@{userProfile.username}</h2>
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
                <AttendanceCalendar data={formatedDataForActivity} />
            </div>
            <Modal
                id="logoutModal"
                title={"Logout?"}
                content={"Are you sure you want to log out?"}
                clickFunction={logoutUser}
            />

            {/* Show profile update button only for logged-in user */}
            {userProfile.id === user.user_id && updateProfile && (
                <div className="flex w-1/3 flex-col h-full justify-center items-center md:w-11/12 md:pb-16 md:justify-center md:items-center">
                    <ProfilePictureUpdate />
                    <div className="flex w-full justify-between h-fit md:flex-col md:h-full">
                        <form
                            className="form-control bg-[#190C34] m-2 w-full flex justify-center items-center flex-col py-4 rounded-xl md:m-0 md:mt-4"
                            onSubmit={handleSubmit}
                        >
                            <h2 className="text-2xl mb-2">Update Profile</h2>
                            <label className="input input-bordered flex items-center gap-2 my-1 w-11/12">
                                <MdDriveFileRenameOutline />
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    defaultValue={userProfile.first_name}
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-1 w-11/12">
                                <MdDriveFileRenameOutline />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    defaultValue={userProfile.last_name}
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mt-5 w-11/12">
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
                            className="form-control bg-[#190C34] m-2 w-full flex justify-center items-center flex-col py-4 rounded-xl md:m-0 md:mt-4"
                            onSubmit={handlePasswordSubmit}
                        >
                            <h2 className="text-2xl mb-2">Change Password</h2>

                            <label className="input input-bordered flex items-center gap-2 my-1">
                                <MdDriveFileRenameOutline />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="New Password"
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-1">
                                <MdDriveFileRenameOutline />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm New Password"
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mt-5">
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
                </div>
            )}
        </div>
    );
}
