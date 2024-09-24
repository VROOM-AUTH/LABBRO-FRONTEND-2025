import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Countdown from "../components/Countdown";
export default function Home() {
    const { logoutUser, user } = useContext(AuthContext);

    return (
        <div className="flex justify-center items-center flex-col">
            <h1>Home Page</h1>
            <h2>Welcome {user.username}</h2>
            <button className="btn btn-outline" onClick={logoutUser}>
                Logout
            </button>
            <Countdown />
        </div>
    );
}
