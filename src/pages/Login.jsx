import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Login() {
    const { loginUser } = useContext(AuthContext);
    return (
        <div className="flex justify-center items-center w-full h-full">
            <form onSubmit={loginUser}>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                />
                <input type="submit" />
            </form>
        </div>
    );
}
