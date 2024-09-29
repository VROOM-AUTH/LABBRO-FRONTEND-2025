import React, { useEffect, useContext, useState } from "react";
import formatDate from "../utils/dateFormat";
import secondsFormat from "../utils/secondsFormat";

export default function LabStatusCard({ users, labStatus, totalLabTime }) {
    const usersInLab = users?.filter((user) =>
        labStatus?.currentMembers?.includes(user.username)
    );
    return (
        <div className="flex rounded-lg shadow justify-evenly items-center flex-col bg-[#190c34] w-64 h-fit min-h-52 m-2">
            <h1 className="text-2xl w-full p-2 text-center">
                The Lab is{" "}
                {labStatus.status ? (
                    <span className="text-green-500">open</span>
                ) : (
                    <span className="text-red-500">closed</span>
                )}
                !
            </h1>
            <div className="flex justify-start items-center  w-4/5 flex-wrap">
                {usersInLab &&
                    usersInLab.map((user) => (
                        <img
                            key={user.id}
                            src={user.image}
                            className="w-8 h-8 rounded-full m-1"
                            title={user.username}
                        ></img>
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
        </div>
    );
}