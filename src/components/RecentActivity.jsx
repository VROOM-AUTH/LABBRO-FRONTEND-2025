import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import formatDate from "../utils/dateFormat";
export default function RecentActivity({ users }) {
    const navigate = useNavigate();
    const [recentActivity, setRecentActivity] = useState([]);
    const api = useAxios();

    useEffect(() => {
        const halfMinute = 30 * 1000;
        api.get("/labsessions/recent/").then((response) => {
            if (response.data) {
                setRecentActivity(response.data);
            }
        });

        const interval = setInterval(() => {
            api.get("/labsessions/recent/").then((response) => {
                if (response.data) {
                    setRecentActivity(response.data);
                }
            });
        }, halfMinute);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const slicedVActivity = recentActivity?.slice(0, 5);
    return (
        <div className="flex flex-col justify-start items-center w-fit mx-2 h-fit bg-[#190C34] rounded-xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] overflow-y-auto overflow-x-hidden md:w-full">
            <h1 className="text-2xl w-full text-center bg-[#473663] rounded-t-lg py-1 px-2 flex items-center justify-center">
                Lab Activity
            </h1>

            {recentActivity &&
                users &&
                slicedVActivity.map((entry, index) => (
                    <div
                        className={`flex justify-between items-center my-2 w-11/12 h-14 px-2 rounded-xl cursor-pointer transition-all duration-100 hover:scale-110 md:w-full ${
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
