import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Countdown from "../components/Countdown";
import useAxios from "../utils/useAxios";
import TopNavigation from "../components/TopNavigation";
import LabStatusCard from "../components/LabStatusCard";

export default function Home() {
    const api = useAxios();
    const { user, logoutUser } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.get("/users").then((response) => {
            if (response.data) {
                setUsers(response.data);
            }
        });
    }, []);
    return (
        <div className="flex justify-start items-center flex-col w-full h-full">
            <TopNavigation />
            <h1>Home Page</h1>
            <h2>Welcome {user.username}</h2>
            <button onClick={logoutUser}>Logout</button>
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
            <LabStatusCard users={users} />
        </div>
    );
}
