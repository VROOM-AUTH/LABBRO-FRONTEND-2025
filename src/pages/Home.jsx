import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Countdown from "../components/Countdown";
import useAxios from "../utils/useAxios";

export default function Home() {
    const { logoutUser, user } = useContext(AuthContext);

    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    let api = useAxios();

    const getUserData = async () => {
        const response = await api.get("/users/");
        if (response.status === 200) {
            setUserData(response.data);
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="flex justify-center items-center flex-col">
            <h1>Home Page</h1>
            <h2>Welcome {user.username}</h2>
            <button className="btn btn-outline" onClick={logoutUser}>
                Logout
            </button>
            <Countdown />
            {!loading &&
                userData.map((user) => <p key={user.id}>{user.username}</p>)}
        </div>
    );
}
