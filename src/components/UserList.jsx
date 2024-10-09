import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserList({ users }) {
    const usersFiltered = users.filter(
        (user) => user.username !== "labbro_admin"
    );
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-start items-center bg-[#190C34] rounded-xl w-96 h-96 md:w-full md:mt-8 mr-2 md:mr-0 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
            <h2 className="text-2xl py-1 bg-[#473663] rounded-t-xl w-full text-center mb-2">
                All Users
            </h2>
            <div className="flex justify-center items-start w-full flex-wrap overflow-auto">
                {usersFiltered &&
                    usersFiltered.map((user) => (
                        <div
                            key={user.id}
                            className="m-2 flex justify-center items-center flex-col w-min min-w-16 cursor-pointer transition-all duration-100 hover:scale-110"
                            onClick={() => navigate(`/profile/${user.id}`)}
                        >
                            <div className="w-14 h-14 rounded-full overflow-hidden ">
                                <img
                                    src={user.image}
                                    className="w-14 h-14 mr-4 rounded-full object-cover "
                                ></img>
                            </div>
                            <p>{user.username}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
