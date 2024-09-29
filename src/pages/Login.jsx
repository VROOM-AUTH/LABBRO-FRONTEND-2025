import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { FaUser, FaKey } from "react-icons/fa";
export default function Login() {
    const { loginUser, error, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        logoutUser();
    }, []);
    return (
        <div className="flex justify-center items-center  flex-col  w-full h-full bg-gradient-to-r from-[#141414]  to-[#040018]">
            <form
                onSubmit={loginUser}
                className="form-control flex justify-center items-center flex-col w-3/12 h-3/6"
            >
                <h1 className="text-4xl font-bold mb-6">Login</h1>
                <label className="input input-bordered flex items-center gap-2 m-1">
                    <FaUser />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 m-1">
                    <FaKey />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                </label>
                <label className="label cursor-pointer w-3/5 flex justify-start">
                    <span className="label-text mr-3 text-base">
                        Remember me
                    </span>
                    <input
                        type="checkbox"
                        defaultChecked
                        name="stayLoggedIn"
                        className="checkbox"
                    />
                </label>
                {error && <div className="text-red-500 mt-1">{error}</div>}
                <input
                    type="submit"
                    className="btn btn-primary w-72 mt-6"
                    value="Login"
                />
            </form>
        </div>
    );
}
