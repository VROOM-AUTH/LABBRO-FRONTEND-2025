import React, { useEffect, useContext, useState } from "react";
import ProfilePictureUpdate from "../components/ProfilePictureUpdater";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import TopNavigation from "../components/TopNavigation";
import secondsFormat from "../utils/secondsFormat";
export default function Profile() {
    const api = useAxios();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.get("/users").then((response) => {
            if (response.data) {
                setUsers(response.data);
            }
        });
    }, []);
    const { user } = useContext(AuthContext);
    const loggedInUser = users.find((u) => u.id === user.user_id);

    console.log(loggedInUser);
    return (
        <div className="flex flex-col justify-start items-center w-full h-full">
            <TopNavigation />

            <h1>My Profile</h1>
            <div className="flex flex-col justify-center items-center">
                <img
                    src={loggedInUser?.image}
                    alt="Profile"
                    className="w-32 h-32 rounded-full"
                />
                <h2 className="text-2xl">@{loggedInUser?.username}</h2>
                <p>Total time: {secondsFormat(loggedInUser?.total_time)}</p>
            </div>
            <ProfilePictureUpdate />
        </div>
    );
}
