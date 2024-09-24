import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Countdown from "../components/Countdown";
export default function Home() {
    const { logoutUser, user } = useContext(AuthContext);

    // FOR FETCHING PROTECTED DATA

    // const fetchData = async () => {
    //     const response = await fetch(`${apiUrl}/protected-endpoint`, {
    //         method: "GET",
    //         credentials: 'include' // Include cookies
    //     });

    //     const data = await response.json();
    //     if (response.ok) {
    //         console.log(data);
    //     } else {
    //         console.log("Failed to fetch protected data");
    //     }
    // };
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
