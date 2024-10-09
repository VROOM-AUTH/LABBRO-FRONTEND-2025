import React from "react";
import { Link } from "react-router-dom";
import github from "../assets/icons/github.png";
import calendar from "../assets/icons/calendar.png";
import cyclopt from "../assets/icons/cyclopt.jpeg";
import drive from "../assets/icons/drive.png";
import overleaf from "../assets/icons/overleaf.png";
import discord from "../assets/icons/discord.png";

export default function LinksToPlatformsCard() {
    const links = [
        {
            name: "GitHub",
            url: "https://github.com/VROOM-AUTH",
            icon: github,
        },
        {
            name: "Cyclopt",
            url: "https://platform.cyclopt.com/my-kanban",
            icon: cyclopt,
        },
        {
            name: "Drive",
            url: "https://drive.google.com/drive/u/0/folders/0AFmq70ZNKGR9Uk9PVA",
            icon: drive,
        },
        {
            name: "Discord",
            url: "https://discord.com/channels/778738223282913350",
            icon: discord,
        },
        {
            name: "Calendar",
            url: "https://calendar.google.com/calendar/",
            icon: calendar,
        },
        {
            name: "Overleaf",
            url: "https://www.overleaf.com/project",
            icon: overleaf,
        },
    ];
    return (
        <div className="flex justify-evenly items-center w-full h-40 md:w-11/12 md:mt-2 md:mb-4 rounded-xl mt-2 bg-[#190C34] md:flex-wrap md:h-fit shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
            {links.map((link, index) => (
                <Link
                    to={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:mb-4 transition-all duration-100 flex flex-col items-center justify-center md:mx-4"
                    key={index}
                >
                    <img
                        src={link.icon}
                        className="w-16 h-16 bg-white rounded-2xl p-1 m-2"
                    ></img>
                    <h1 className="text-base text-white text-center">
                        {link.name}
                    </h1>
                </Link>
            ))}
        </div>
    );
}
