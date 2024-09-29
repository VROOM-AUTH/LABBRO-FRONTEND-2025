import React from "react";
import TopNavigation from "../components/TopNavigation";

export default function Users() {
    return (
        <div className="flex flex-col justify-start items-center w-full h-full">
            <TopNavigation />
            <h1 className="text-2xl">Users</h1>
        </div>
    );
}
