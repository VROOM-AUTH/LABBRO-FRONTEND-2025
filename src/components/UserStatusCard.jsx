import React, { useContext, useMemo } from "react";
import AuthContext from "../context/AuthContext";
import coin from "../assets/coin.png";
import secondsFormat from "../utils/secondsFormat";
import { FcClock } from "react-icons/fc";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import formatDate from "../utils/dateFormat";
import { IoExitSharp } from "react-icons/io5";
import Modal from "./Modal";
import useAxios from "../utils/useAxios";
export default function UserStatusCard({
    users,
    vroomvolts,
    labSessions,
    labStatus,
}) {
    const api = useAxios();
    const { user } = useContext(AuthContext);
    const name = users.filter((u) => user.user_id === u.id)[0]?.first_name;
    const image = users.filter((u) => user.user_id === u.id)[0]?.image;
    const myVroomvolts = Array.isArray(vroomvolts)
        ? vroomvolts.filter((v) => user.user_id === v.user)[0]?.value
        : null;

    const myTime = users.filter((u) => user.user_id === u.id)[0]?.total_time;
    const lastTimeAtLab = useMemo(
        () =>
            labSessions
                .filter(
                    (session) =>
                        session.user === user.user_id && session.status === true
                )
                .sort(
                    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                )[0]?.timestamp,
        [labSessions, user.user_id]
    );

    const checkoutFunction = () => {
        api.post("/checkout/");
        window.location.reload();
    };

    const checkedIn = labStatus.currentMembers?.includes(user.username);
    return (
        <div className="flex rounded-lg justify-evenly items-center flex-col bg-[#190c34] w-96 h-fit min-h-52 m-2 md:w-11/12 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] relative">
            <div className="flex w-3/4 h-20 justify-center items-center md:justify-start md:w-full md:ml-4">
                <img className="w-16 h-16 rounded-full" src={image}></img>
                <h1 className="text-2xl w-full p-2 md:w-3/4">
                    Welcome back,{" "}
                    <span className="text-pink-400">
                        {name ? name : user.username}
                    </span>
                    !
                </h1>
                {checkedIn && (
                    <span
                        className="top-6 right-2 text-l w-12 h-12 rounded-xl flex justify-center items-center absolute p-1 bg-red-500 hover:top-4 transition-all duration-100 cursor-pointer md:w-10 md:h-10 md:top-8 md:right-2 md:hover:top-8"
                        title="Checkout from lab"
                        onClick={() =>
                            document
                                .getElementById("checkoutUserSure")
                                .showModal()
                        }
                    >
                        <IoExitSharp className="text-white w-9 h-9" />
                    </span>
                )}
            </div>
            <Modal
                id={"checkoutUserSure"}
                title={"Check out from lab?"}
                content={"Are you sure you want to check out from the lab?"}
                clickFunction={checkoutFunction}
            />
            <div className="flex justify-between items-center w-5/6 md:w-11/12">
                <div className="flex justify-start items-center flex-col">
                    <div className="flex justify-start items-center w-full h-12">
                        <img className="w-8 h-8" src={coin}></img>
                        <p className="text-xl mx-2">{myVroomvolts}</p>
                    </div>
                    <div className="flex justify-start items-center w-full h-12">
                        <FcClock className="w-8 h-8 text-black" />
                        {myTime ? (
                            <p className="text-xl mx-2">
                                {secondsFormat(myTime)}
                            </p>
                        ) : (
                            <span className="loading loading-dots loading-sm"></span>
                        )}
                    </div>
                </div>
                <div className="flex justify-end items-center flex-col">
                    <div className="flex justify-end items-center w-full h-12">
                        <FaCalendarAlt className="w-7 h-7" />

                        <p className="text-xl mx-2">
                            {lastTimeAtLab ? (
                                formatDate(lastTimeAtLab)
                            ) : (
                                <span className="loading loading-dots loading-sm"></span>
                            )}
                        </p>
                    </div>
                    <div className="flex justify-end items-center w-full h-12">
                        {checkedIn ? (
                            <FaCheckCircle className="w-7 h-7" />
                        ) : (
                            <FaCircleXmark className="w-7 h-7" />
                        )}

                        <p className="text-xl mx-2">
                            {checkedIn ? "Checked in" : "Checked out"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
