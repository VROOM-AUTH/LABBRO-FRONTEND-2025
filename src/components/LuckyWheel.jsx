import React, { useEffect, useState } from "react";
import wheel from "../assets/VroomWheel.webp";
import wheelArrow from "../assets/wheelArrow.png";
import useAxios from "../utils/useAxios";
import { FaCircleInfo } from "react-icons/fa6";
import InfoModal from "./InfoModal";
export default function LuckyWheel({ vroomvolts, setVroomvolts }) {
    const api = useAxios();

    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [error, setError] = useState(null);
    const [winMessage, setWinMessage] = useState(
        "Each spin costs 5 Vroomvolts!"
    );
    const [fullRotations, setFullRotations] = useState(360 * 5);
    const [won, setWon] = useState(false);

    const spinWheel = async () => {
        if (vroomvolts >= 5) {
            setVroomvolts((prev) => prev - 5);
        } else {
            setError("Not enough vroomvolts to spin the wheel!");
            return;
        }
        setWinMessage(null);
        setFullRotations((prev) => prev + 360 * 5);
        try {
            await api
                .post("/spin/")
                .then((response) => {
                    if (response.status !== 200) {
                        console.error("Error spinning the wheel");
                        setError("Error spinning the wheel");
                        return;
                    }
                    if (!spinning) {
                        setSpinning(true);

                        // Add exactly 5 full rotations (5 * 360) + landing position
                        const totalRotation =
                            fullRotations - response.data.position;
                        console.log(totalRotation);
                        // Update the rotation state
                        setRotation(totalRotation);

                        // Reset spinning state after the animation is complete
                        setTimeout(() => {
                            if (response.data.prize.slice(0, 1) === "-") {
                                setWinMessage(
                                    `You lost ${response.data.prize.slice(
                                        1
                                    )} vroomvolts!`
                                );
                                setWon(false);
                            } else if (
                                response.data.prize.slice(0, 1) === "+"
                            ) {
                                setWinMessage(
                                    `You won ${response.data.prize.slice(
                                        1
                                    )} vroomvolts!`
                                );
                                setWon(true);
                            }
                            setVroomvolts(response.data.vroomvolts);

                            setSpinning(false);
                        }, 5000); // Match the duration of the CSS transition
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setError("Error spinning the wheel");
                    return;
                });
        } catch (error) {
            console.log(error);
            setError("Error spinning the wheel");
            return;
        }
    };

    return (
        <div className="w-1/4 h-2/3 bg-[#190C34] rounded-xl flex flex-col justify-evenly items-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] md:w-11/12 overflow-hidden">
            <div className="mt-4 mb-4 flex justify-center w-11/12 relative">
                <h1 className="text-2xl text-white font-bold">Lucky Wheel</h1>
                <FaCircleInfo
                    className="text-white text-3xl absolute right-0 cursor-pointer hover:text-[#ee0f82] transition-all duration-100"
                    onClick={() =>
                        document.getElementById("WheelModal").showModal()
                    }
                />
            </div>
            <InfoModal
                id="WheelModal"
                title="Lucky Wheel Game"
                content="For just 5 Vroomvolts, you have the chance to win a staggering 500 Vroomvolts! But beware... the stakes are high, and it's just as easy to lose 500 Vroomvolts! Are you bold enough to take the risk? Let’s find out..."
            />
            <div className="flex justify-start flex-col items-center">
                <img src={wheelArrow} className="w-[30px]" />
                <img
                    src={wheel}
                    className="w-5/6 rounded-full transition-all duration-[5s] ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}

            <p
                className={`text-2xl mt-4 ${
                    won ? "text-green-500" : "text-red-500"
                }`}
            >
                {winMessage}
            </p>

            <button
                onClick={spinWheel}
                className="my-4 bg-[#ee0f82] text-white text-2xl py-2 rounded-lg px-5 font-extrabold cursor-pointer hover:bg-[#691239] transition-all duration-100 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={spinning}
            >
                SPIN!
            </button>
        </div>
    );
}
