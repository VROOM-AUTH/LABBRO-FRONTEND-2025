import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Countdown from "../components/Countdown";
import useAxios from "../utils/useAxios";
import axios from "axios";

export default function Home() {
    const { logoutUser, user } = useContext(AuthContext);

    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    let api = useAxios();

    useEffect(() => {
        const controller = new AbortController();
        api.get("/users/", { signal: controller.signal })
            .then((response) => {
                if (response.status === 200) {
                    setUserData(response.data);
                    console.log(response.data);
                    setLoading(false);
                }
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log("Request canceled");
                } else {
                    console.log(error);
                }
            });

        return () => {
            controller.abort();
        };
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
