import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Countdown from "../components/Countdown";
import useAxios from "../utils/useAxios";
import ProfilePictureUpdate from "../components/ProfilePictureUpdater";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../components/TopNavigation";
import UsersContext from "../context/UsersContext";
import LabStatusCard from "../components/LabStatusCard";

export default function Home() {
    const { user } = useContext(AuthContext);
    const { users } = useContext(UsersContext);

    return (
        <div className="flex justify-start items-center flex-col w-full h-full">
            <TopNavigation />
            <h1>Home Page</h1>
            <h2>Welcome {user.username}</h2>

            <Countdown />
            <div className="flex flex-col justify-evenly  items-start w-28">
                {users &&
                    users.map((user) => (
                        <div
                            className="flex justify-start items-center h-16"
                            key={user.id}
                        >
                            <img
                                src={user.image}
                                className="w-14 h-14 mr-4 rounded-full"
                            ></img>
                            <p>{user.username}</p>
                        </div>
                    ))}
            </div>
            <LabStatusCard />
        </div>
    );
}
