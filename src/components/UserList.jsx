import React from "react";

export default function UserList({ users }) {
    return (
        <div className="flex flex-col justify-center items-center bg-[#190C34] rounded-xl w-80 h82">
            <h2 className="text-2xl py-1">All Users</h2>
            <div className="flex justify-center items-start w-full flex-wrap overflow-auto">
                {users &&
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="m-2 flex justify-center items-center flex-col w-min min-w-16"
                        >
                            <div className="w-14 h-14 rounded-full overflow-hidden">
                                <img
                                    src={user.image}
                                    className="w-14 h-14 mr-4 rounded-full object-cover"
                                ></img>
                            </div>
                            <p>{user.username}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
