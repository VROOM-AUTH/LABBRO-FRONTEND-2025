import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import {
    optionData,
    first12Numbers,
    second12Numbers,
    third12Numbers,
    redNumbers,
    blackNumbers,
    evenNumbers,
    oddNumbers,
    oneto18,
    nineteento36,
} from "../utils/RouletaData";

import InfoModal from "./InfoModal";
import { FaCircleInfo } from "react-icons/fa6";
import useAxios from "../utils/useAxios";
import RouletaBoard from "./RouletaBoard";
import BetInput from "./BetInput";

export default function Rouleta({ vroomvolts, setVroomvolts }) {
    const api = useAxios();
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [disableButton, setDisableButton] = useState(false);
    const [betAmount, setBetAmount] = useState(5);
    const [bets, setBets] = useState([]);
    const [vroomvoltsWon, setVroomvoltsWon] = useState(0);
    const [totalBet, setTotalBet] = useState(0);
    const [message, setMessage] = useState("Welcome to the Roulette!");
    const stopSpining = () => {
        setMustSpin(false);
        setDisableButton(false);
        setVroomvolts((prev) => prev - totalBet + vroomvoltsWon);
        if (vroomvoltsWon > 0) {
            setMessage(`You won ${vroomvoltsWon} Vroomvolts!`);
        }
        if (vroomvoltsWon == 0) {
            setMessage(`You lost ${totalBet} Vroomvolts!`);
        }
    };

    const handleSpinClick = async () => {
        setMessage("Spinning the wheel...");
        setDisableButton(true);
        let totalBet = 0;
        for (const bet of bets) {
            totalBet += bet.amount;
        }
        if (totalBet == 0) {
            setMessage("You need to bet something!");
            setDisableButton(false);
            return;
        }
        if (vroomvolts < totalBet) {
            setMessage("You don't have enough Vroomvolts to bet that amount!");
            setDisableButton(false);
            return;
        }
        await api
            .post("/rouleta/", {
                bets: bets,
            })
            .then((response) => {
                if (response.status !== 200) {
                    console.error("Error spinning the wheel");
                    return;
                }
                console.log(response.data);
                setPrizeNumber(response.data.choice);
                setTotalBet(response.data.totalBet);
                setVroomvoltsWon(response.data.vroomvoltsWon);
            });
        setMustSpin(true);
    };

    console.log(bets);
    return (
        <div className="flex justify-center items-center flex-col w-1/3 h-fit mt-8 rounded-xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] md:w-11/12 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAACdJREFUGFclirENAAAMguD/o220ixpQMYgEIKi2wQIKJojG5swePw9HKQkOQbvAHAAAAABJRU5ErkJggg==')] bg-repeat bg-[#7a2222]">
            <div className="mt-4 mb-4 flex justify-center w-11/12 relative">
                <h1 className="text-2xl text-white font-bold">Roulette</h1>
                <FaCircleInfo
                    className="text-white text-3xl absolute right-0 cursor-pointer hover:text-[#ee0f82] transition-all duration-100"
                    onClick={() =>
                        document.getElementById("RouletaModal").showModal()
                    }
                />
            </div>
            <InfoModal
                id="RouletaModal"
                title="Roulette Game"
                content="The Roulette is spinning, and every number holds a risk—just as easily as you can win, you could lose it all! Are you ready to let the roulette decide your fate? Spin and see if luck is on your side..."
            />
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={optionData}
                onStopSpinning={stopSpining}
                textColors={["white"]}
                radiusLineColor="#EFB98D"
                radiusLineWidth={3}
                outerBorderWidth={10}
                outerBorderColor="#000"
                // innerBorderColor='#20344C'
                innerBorderColor="#000"
                innerBorderWidth={90}
                perpendicularText={true}
                textDistance={85}
                fontSize={18}
                fontWeight={700}
                spinDuration={0.9}
            />
            <div className="flex justify-between items-center w-10/12 md:w-full md:flex-col">
                <BetInput betAmount={betAmount} setBetAmount={setBetAmount} />
                <button
                    className="my-4 bg-[#ee0f82] text-white text-2xl py-2 rounded-lg px-5 font-extrabold cursor-pointer hover:bg-[#691239] transition-all duration-100 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={handleSpinClick}
                    disabled={disableButton}
                >
                    SPIN!
                </button>
                <button
                    className="my-4 text-white text-lg py-2 rounded-lg px-5 cursor-pointer transition-all duration-100"
                    onClick={() => setBets([])}
                >
                    Clear Bets
                </button>
            </div>
            <p className="text-white text-lg">{message}</p>

            <RouletaBoard bets={bets} setBets={setBets} betAmount={betAmount} />
        </div>
    );
}
