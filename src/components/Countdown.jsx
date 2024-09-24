import React from "react";
import calculateTimeLeft from "../utils/calculateTimeLeft";
import { useEffect } from "react";
import { useState } from "react";

export default function Countdown() {
    const competitionDate = "2025-06-25T12:00:00";
    const [timeLeft, setTimeLeft] = useState(
        calculateTimeLeft(competitionDate)
    );
    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft(calculateTimeLeft(competitionDate));
        }, 1000);
        return () => clearInterval(timerId); // Clean up the interval
    }, []);
    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col">
                <span className="countdown myCountdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.days }}></span>
                </span>
                days
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.hours }}></span>
                </span>
                hours
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.minutes }}></span>
                </span>
                min
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.seconds }}></span>
                </span>
                sec
            </div>
        </div>
    );
}
