import React from "react";

import smartLabImg from "../assets/labcontrol.avif";

export default function SmartLabCard() {
    return (
        <div
            className="flex h-52 bg-cover bg-center md:w-11/12 md:mt-2 md:mb-4 rounded-xl mt-2 bg-[#473663] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
            style={{ backgroundImage: `url(${smartLabImg})` }}
        ></div>
    );
}
