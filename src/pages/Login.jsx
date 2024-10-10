import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { FaUser, FaKey } from "react-icons/fa";
import InfoModal from "../components/InfoModal";
export default function Login() {
    const { loginUser, error, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        logoutUser();
    }, []);
    return (
        <div className="flex justify-start items-center  flex-col  w-full h-full bg-gradient-to-r from-[#141414]  to-[#040018] md:h-screen">
            <form
                onSubmit={loginUser}
                className="form-control flex justify-center items-center m-48 flex-col w-3/12 h-3/6 md:w-full"
            >
                <h1 className="text-4xl font-bold mb-6">Login</h1>
                <label className="input input-bordered flex items-center gap-2 m-2 bg-[#1D232A]">
                    <FaUser />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 m-2 bg-[#1D232A]">
                    <FaKey />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                </label>
                <label className="label cursor-pointer w-3/5 flex justify-start md:w-4/5">
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
                <div className="flex justify-between items-center w-7/12 mt-4 md:w-3/4">
                    <input
                        type="submit"
                        className="btn bg-[#515ffb] hover:bg-[#6e7aff] text-white"
                        value="Login"
                    />
                    <h1
                        className="text-lg text-[#6e7aff] cursor-pointer"
                        onClick={() =>
                            document
                                .getElementById("forgotPassword")
                                .showModal()
                        }
                    >
                        Forgot password?
                    </h1>
                </div>
            </form>
            <InfoModal
                id={"forgotPassword"}
                content={
                    "If you forgot your password send a message in Discord and we will reset it!"
                }
                title={"Forgot Password?"}
            />
        </div>
    );
}
