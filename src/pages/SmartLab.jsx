import React from "react";
import TopNavigation from "../components/TopNavigation";

export default function SmartLab() {
    return (
        <div className="flex flex-col justify-start items-center w-full h-full">
            <TopNavigation />
            <h1 className="text-2xl">Smart Lab</h1>
        </div>
    );
}
