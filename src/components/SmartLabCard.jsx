import React from "react";

import smartLabImg from "../assets/labcontrol.avif";

export default function SmartLabCard() {
    return (
        <div
            className="flex h-52 bg-cover bg-center md:w-11/12 md:mt-2 md:mb-4 rounded-xl mt-2 cursor-pointer hover:scale-105 transform transition-transform duration-300"
            style={{ backgroundImage: `url(${smartLabImg})` }}
        ></div>
    );
}
