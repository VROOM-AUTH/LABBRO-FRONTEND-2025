import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import formatDate from "../utils/dateFormat";
export default function RecentActivity({ users, recentActivity }) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-start items-start w-fit md:pb-16 md:mt-10">
            {recentActivity &&
                users &&
                recentActivity.map((entry, index) => (
                    <div
                        className={`flex justify-between items-center my-2 w-52 h-14 px-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-110 ${
                            entry.status ? "bg-[#1C875D]" : "bg-[#9d3c55]"
                        }`}
                        style={{ opacity: (100 - index * 7) / 100 }} // dynamically setting opacity
                        key={entry.timestamp}
                        onClick={() => navigate(`/profile/${entry.user}`)}
                    >
                        <img
                            className="w-12 h-12 rounded-full mr-2 "
                            src={users.find((u) => u.id === entry.user)?.image}
                        ></img>
                        <p className="font-bold text-left w-20">
                            {entry?.username}
                        </p>
                        <p className="text-right w-14 ">
                            {formatDate(entry?.timestamp, true)}
                        </p>
                    </div>
                ))}
        </div>
    );
}
