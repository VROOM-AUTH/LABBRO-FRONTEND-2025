import React, { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
export default function CheckInOutUsers() {
    const [users, setUsers] = useState(null);
    const [currentMembers, setCurrentMembers] = useState(null);
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const api = useAxios();

    useEffect(() => {
        api.get("/users").then((response) => {
            if (response.data) {
                setUsers(response.data);
            }
        });

        api.get("/labstatus/latest").then((response) => {
            if (response.data) {
                setCurrentMembers(response.data.currentMembers);
            }
        });
    }, [triggerUpdate]);

    const getUserStatus = (user) => {
        let status = false;
        if (currentMembers) {
            status = currentMembers.includes(user.username);
        }
        return status;
    };

    const handleInOut = (user) => {
        const status = getUserStatus(user);
        api.post("/labsessions/", {
            user: user.id,
            status: !status,
        }).then(() => {
            setTriggerUpdate((prev) => !prev); // Toggle triggerUpdate to refresh data
        });
    };

    return (
        <div className="flex justify-center items-center flex-col w-2/12 h-min min-h-3/6 bg-[#201338] rounded-xl">
            <h2 className="text-xl">Check In/Out Users</h2>
            <div className="flex flex-col justify-evenly  items-start w-2/3">
                {users &&
                    users.map((user) => (
                        <div
                            className="flex justify-between items-center h-full w-full hover:bg-gray-800 my-1 p-1 px-5 rounded-xl cursor-pointer"
                            key={user.id}
                            onClick={() => handleInOut(user)}
                        >
                            <img
                                src={user.image}
                                className="w-14 h-14 mr-4 rounded-full"
                            ></img>
                            <p>{user.username}</p>
                            <p
                                className={
                                    getUserStatus(user)
                                        ? "text-green-500"
                                        : "text-red-600"
                                }
                            >
                                {getUserStatus(user) ? "IN" : "OUT"}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
