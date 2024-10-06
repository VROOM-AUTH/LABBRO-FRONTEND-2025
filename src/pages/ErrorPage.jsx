import React from "react";
import errorImg from "../assets/404.svg";

export default function ErrorPage() {
    return (
        <div className="flex w-full h-full justify-center items-center flex-col">
            <h1 className="text-4xl m-4">Page not found!</h1>
            <img className="h-2/5" src={errorImg}></img>
            <a
                href="/"
                className="text-2xl text-white bg-pink-500 p-2 mt-4 rounded-xl hover:bg-pink-800 hover:text-white"
            >
                Return home
            </a>
        </div>
    );
}
