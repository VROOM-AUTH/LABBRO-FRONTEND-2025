import React from "react";
import vroomgamesImage from "../assets/casino.jpg";
import roulette from "../assets/roulette.png";
import blackjack from "../assets/blackjack.png";
import wheel from "../assets/wheel.png";
import { useNavigate } from "react-router-dom";
export default function VroomvoltGamesCard() {
    const navigate = useNavigate();
    return (
        <div
            className="flex justify-evenly items-center h-52 bg-cover bg-center md:w-11/12 md:mt-2 md:mb-4 rounded-xl mt-2 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
            style={{ backgroundImage: `url(${vroomgamesImage})` }}
        >
            <div
                className="flex justify-center items-center w-36 h-36 rounded-2xl bg-[#10002BDF] transition-all duration-200 hover:scale-105 md:w-24 md:h-24 cursor-pointer"
                onClick={() => navigate("/vroomvolts")}
            >
                <img
                    src={blackjack}
                    className="h-28 hover:animate-bounce md:h-16"
                    alt="blackjack"
                />
            </div>
            <div
                className="flex justify-center items-center w-36 h-36 rounded-2xl bg-[#10002BDF] transition-all duration-200 hover:scale-105 md:w-24 md:h-24 cursor-pointer"
                onClick={() => navigate("/vroomvolts")}
            >
                <img
                    src={roulette}
                    className="w-28 h-28 hover:animate-spin md:w-16 md:h-16"
                    alt="roulette"
                />
            </div>
            <div
                className="flex justify-center items-center w-36 h-36 rounded-2xl bg-[#10002BDF] transition-all duration-200 hover:scale-105 md:w-24 md:h-24 cursor-pointer"
                onClick={() => navigate("/vroomvolts")}
            >
                <img
                    src={wheel}
                    className="w-28 h-28 hover:animate-spin md:w-16 md:h-16"
                    alt="wheel"
                />
            </div>
        </div>
    );
}
