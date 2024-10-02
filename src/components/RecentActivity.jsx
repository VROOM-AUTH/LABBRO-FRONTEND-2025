import React, { useEffect } from "react";
import formatDate from "../utils/dateFormat";
export default function RecentActivity({ users, recentActivity }) {
    return (
        <div className="flex flex-col justify-start items-start w-fit">
            {recentActivity &&
                users &&
                recentActivity.map((entry, index) => (
                    <div
                        className={`flex justify-between items-center my-2 w-52 h-14 px-2 rounded-xl ${
                            entry.status ? "bg-[#1C875D]" : "bg-[#9d3c55]"
                        }`}
                        style={{ opacity: (100 - index * 7) / 100 }} // dynamically setting opacity
                        key={entry.timestamp}
                    >
                        <img
                            className="w-12 h-12 rounded-full mr-2"
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
