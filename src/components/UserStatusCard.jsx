import React, { useContext, useMemo } from "react";
import AuthContext from "../context/AuthContext";
import coin from "../assets/coin.png";
import secondsFormat from "../utils/secondsFormat";
import { FcClock } from "react-icons/fc";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import formatDate from "../utils/dateFormat";

export default function UserStatusCard({
    users,
    vroomvolts,
    labSessions,
    labStatus,
}) {
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

    const checkedIn = labStatus.currentMembers?.includes(user.username);
    return (
        <div className="flex rounded-lg shadow justify-evenly items-center flex-col bg-[#190c34] w-64 h-fit min-h-52 m-2 md:w-11/12">
            <div className="flex w-3/4 h-20 justify-center items-center">
                <img className="w-16 h-16 rounded-full" src={image}></img>
                <h1 className="text-2xl w-full p-2">
                    Welcome{" "}
                    <span className="text-pink-400">
                        {name ? name : user.username}
                    </span>
                    !
                </h1>
            </div>
            <div className="flex justify-start items-center w-3/4 h-12">
                <img className="w-8 h-8" src={coin}></img>
                <p className="text-xl mx-2">{myVroomvolts}</p>
            </div>
            <div className="flex justify-start items-center w-3/4 h-12">
                <FcClock className="w-8 h-8 text-black" />
                <p className="text-xl mx-2">{secondsFormat(myTime)}</p>
            </div>
            <div className="flex justify-start items-center w-3/4 h-12">
                <FaCalendarAlt className="w-7 h-7" />

                <p className="text-xl mx-2">{formatDate(lastTimeAtLab)}</p>
            </div>
            <div className="flex justify-start items-center w-3/4 h-12">
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
    );
}
