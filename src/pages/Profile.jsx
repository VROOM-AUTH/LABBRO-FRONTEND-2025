import React, { useEffect, useContext, useState } from "react";
import ProfilePictureUpdate from "../components/ProfilePictureUpdater";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import TopNavigation from "../components/TopNavigation";
import UsersContext from "../context/UsersContext";
export default function Profile() {
    const { users } = useContext(UsersContext);
    const { user } = useContext(AuthContext);
    const loggedInUser = users.find((u) => u.id === user.user_id);

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
            </div>
            <ProfilePictureUpdate />
        </div>
    );
}
