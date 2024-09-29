import React from "react";

export default function UserList({ users }) {
    return (
        // <div className="flex flex-col justify-start  items-start w-28 h-60 flex-wrap">
        <div className="flex justify-start items-start w-60 h-min flex-wrap bg-[#190C34] rounded-xl">
            {users &&
                users.map((user) => (
                    <div
                        key={user.id}
                        className="m-2 flex justify-center items-center flex-col w-min min-w-16"
                    >
                        <div class="w-14 h-14 rounded-full overflow-hidden">
                            <img
                                src={user.image}
                                className="w-14 h-14 mr-4 rounded-full object-cover"
                            ></img>
                        </div>
                        <p>{user.username}</p>
                    </div>
                ))}
        </div>
    );
}
