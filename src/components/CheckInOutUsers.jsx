import React, { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
export default function CheckInOutUsers() {
    const [users, setUsers] = useState(null);
    const [currentMembers, setCurrentMembers] = useState(null);
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const api = useAxios();

    const usersWithoutAdmin = users?.filter(
        (u) => u?.username !== "labbro_admin"
    );

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
        api.post("/labsessions/", {
            user: user.id,
        }).then(() => {
            setTriggerUpdate((prev) => !prev); // Toggle triggerUpdate to refresh data
        });
    };

    return (
        <div className="flex justify-center items-center flex-col w-4/12 h-2/3 bg-[#201338] rounded-xl md:w-11/12 md:mt-4">
            <div className="flex justify-between items-center w-5/6 md:w-full md:flex-col md:mb-2">
                <h2 className="text-2xl">Check Users In & Out</h2>
                {users && (
                    <button
                        className="bg-red-500 text-xl rounded-lg p-1"
                        onClick={() =>
                            handleInOut(
                                users.filter(
                                    (u) => u?.username === "labbro_admin"
                                )[0]
                            )
                        }
                    >
                        Check Out All!
                    </button>
                )}
            </div>
            <div className="flex justify-center flex-col items-center w-full flex-wrap h-5/6 overflow-auto">
                {users &&
                    usersWithoutAdmin.map((user) => (
                        <div
                            className="flex justify-between items-center h-16 w-52 bg-[#10002b] hover:bg-gray-800 my-1 mx-2 p-1 px-5 rounded-xl cursor-pointer"
                            key={user.id}
                            onClick={() => handleInOut(user)}
                        >
                            <img
                                src={user.image}
                                className="w-12 h-12 rounded-full"
                            ></img>
                            <p className="font-bold text-left">
                                {user.username}
                            </p>
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
