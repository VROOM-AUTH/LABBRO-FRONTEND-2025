import React from "react";
import TopNavigation from "../components/TopNavigation";

export default function Marathon() {
    return (
        <div className="flex flex-col justify-start items-center w-full h-full">
            <TopNavigation />
            <h1 className="text-2xl">Marathon</h1>
        </div>
    );
}
