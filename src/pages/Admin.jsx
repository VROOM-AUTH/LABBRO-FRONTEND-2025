import React from "react";
import TopNavigation from "../components/TopNavigation";
import RegisterUser from "../components/RegisterUser";
import CheckInOutUsers from "../components/CheckInOutUsers";

export default function Admin() {
    return (
        <div className="flex flex-col justify-start items-center w-full h-full">
            <TopNavigation />
            <h1 className="text-2xl">Admin</h1>
            <div className="flex w-full h-full justify-evenly">
                <RegisterUser />
                <CheckInOutUsers />
            </div>
        </div>
    );
}
