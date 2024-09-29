import React from "react";
import TopNavigation from "../components/TopNavigation";
import RegisterUser from "../components/RegisterUser";
import CheckInOutUsers from "../components/CheckInOutUsers";

export default function Admin() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <TopNavigation />
            <div className="flex w-full h-full justify-evenly items-center">
                <RegisterUser />
                <CheckInOutUsers />
            </div>
        </div>
    );
}
