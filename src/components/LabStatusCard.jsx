import React, { useEffect, useState } from "react";
import formatDate from "../utils/dateFormat";
import secondsFormat from "../utils/secondsFormat";
import useAxios from "../utils/useAxios";

export default function LabStatusCard({ users }) {
    const [labStatus, setLabStatus] = useState(null);
    const [totalLabTime, setTotalLabTime] = useState(0);
    const api = useAxios();

    useEffect(() => {
        const halfMinute = 30 * 1000;
        api.get("/labstatus/latest/").then((response) => {
            if (response.data) {
                setLabStatus(response.data);
            }
        });
        api.get("/labstatus/durations/total").then((response) => {
            if (response.data) {
                setTotalLabTime(response.data.total_duration);
            }
        });

        const interval = setInterval(() => {
            api.get("/labstatus/latest/").then((response) => {
                if (response.data) {
                    setLabStatus(response.data);
                }
            });
            api.get("/labstatus/durations/total").then((response) => {
                if (response.data) {
                    setTotalLabTime(response.data.total_duration);
                }
            });
        }, halfMinute);

        return () => {
            clearInterval(interval);
        };
    }, []);
    // Filter users that are in the lab
    const usersInLab = users?.filter((user) =>
        labStatus?.currentMembers?.includes(user.username)
    );
    return (
        <div className="flex rounded-lg justify-evenly items-center flex-col bg-[#190c34] w-64 h-fit min-h-52 md:w-11/12 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
            {labStatus ? (
                <>
                    <h1 className="text-2xl w-full p-2 text-center">
                        The Lab is{" "}
                        {labStatus.status ? (
                            <span className="text-green-500 animate-pulse">
                                open
                            </span>
                        ) : (
                            <span className="text-red-500">closed</span>
                        )}
                        !
                    </h1>
                    <div className="flex justify-start items-center  w-4/5 flex-wrap">
                        {usersInLab &&
                            usersInLab.map((user) => (
                                <div
                                    className="md:flex md:flex-col md:justify-center md:items-center"
                                    key={user.id}
                                >
                                    <img
                                        src={user.image}
                                        className="w-8 h-8 rounded-full m-1 md:w-10 md:h-10"
                                        title={user.username}
                                    ></img>
                                    <div className="hidden md:flex md:text-sm">
                                        {user.username}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <p className="my-1">
                        {labStatus.status ? "Opend" : "Closed"} at{" "}
                        <span className="text-pink-400">
                            {formatDate(labStatus.last_updated)}
                        </span>
                    </p>
                    <p className="my-1">
                        Total Time:{" "}
                        <span className="text-pink-400">
                            {secondsFormat(totalLabTime)}
                        </span>{" "}
                    </p>
                </>
            ) : (
                <h1 className="text-2xl w-full p-2 text-center">Loading...</h1>
            )}
        </div>
    );
}
