import React, { useEffect, useContext, useState } from "react";
import useAxios from "../utils/useAxios";
import formatDate from "../utils/dateFormat";

export default function LabStatusCard({ users }) {
    const api = useAxios();
    const [labStatus, setLabStatus] = useState({});
    useEffect(() => {
        api.get("/labstatus/latest").then((response) => {
            if (response.data) {
                setLabStatus(response.data);
            }
        });
    }, []);

    const usersInLab = users?.filter((user) =>
        labStatus?.currentMembers?.includes(user.username)
    );
    return (
        <div className="flex rounded-lg shadow justify-start items-center flex-col bg-[#190c34] w-52 h-52">
            <h1 className="text-2xl w-full p-2">Lab Status</h1>
            <h2 className="text-xl mb-2">
                The lab is {labStatus.status ? "open" : "closed"}!
            </h2>
            <div className="flex justify-start items-center  w-4/5 flex-wrap">
                {usersInLab &&
                    usersInLab.map((user) => (
                        <img
                            src={user.image}
                            className="w-8 h-8 rounded-full mx-1"
                        ></img>
                    ))}
            </div>
            {labStatus.status ? "Opend" : "Closed"} at{" "}
            {formatDate(labStatus.last_updated)}
        </div>
    );
}
