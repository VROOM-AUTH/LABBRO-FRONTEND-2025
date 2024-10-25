import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./Rouleta.css";
import {
    data,
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
import RouletaBoard from "./RouletaBoard";
import InfoModal from "./InfoModal";
import { FaCircleInfo } from "react-icons/fa6";

export default function Rouleta({ vroomvolts, setVroomvolts }) {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [betAmount, setBetAmount] = useState(10);
    const [winNumber, setWinNumber] = useState(0);
    const [bets, setBets] = useState([]);
    const [message, setMessage] = useState("Welcome to Roulette!");
    const [totalBet, setTotalBet] = useState(0);

    const handleSpinClick = () => {
        if (bets.length === 0) {
            setMessage("You must place a bet!");
            return;
        } else if (totalBet > vroomvolts) {
            setMessage("You don't have enough VroomVolts!");
            return;
        } else if (bets.some((bet) => bet.amount <= 0)) {
            setMessage("You have invalid bets!");
            return;
        } else if (!mustSpin) {
            setMessage("Spinning...");
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            const targetOption = newPrizeNumber.toString(); // The option you want to find
            setWinNumber(parseInt(targetOption));

            const index = data.findIndex(
                (entry) => entry.option === targetOption
            );
            setPrizeNumber(index);
            setMustSpin(true);
        }
    };

    useEffect(() => {
        setTotalBet(calculateTotalBet());
    }, [bets]);

    function handleBetClick(b) {
        let newBets;
        if (b === 112 || b === 212 || b === 312) {
            // Handle 1st, 2nd, and 3rd 12 cases
            const numbersToCheck =
                b === 112
                    ? first12Numbers
                    : b === 212
                    ? second12Numbers
                    : third12Numbers;
            newBets = {
                type: "dozen",
                numbers: numbersToCheck,
                multiplier: calculateMultiplier(numbersToCheck),
                amount: betAmount,
            };
        } else if (b === -1 || b === -2) {
            const numbersToCheck = b === -1 ? redNumbers : blackNumbers;
            newBets = {
                type: b === -1 ? "red" : "black",
                numbers: numbersToCheck,
                multiplier: calculateMultiplier(numbersToCheck),
                amount: betAmount,
            };
        } else if (b === -3 || b === -4) {
            const numbersToCheck = b === -3 ? oddNumbers : evenNumbers;
            newBets = {
                type: b === -3 ? "odd" : "even",
                numbers: numbersToCheck,
                multiplier: calculateMultiplier(numbersToCheck),
                amount: betAmount,
            };
        } else if (b === 118 || b === 1936) {
            const numbersToCheck = b === 118 ? oneto18 : nineteento36;
            newBets = {
                type: b === 118 ? "oneto18" : "nineteento36",
                numbers: numbersToCheck,
                multiplier: calculateMultiplier(numbersToCheck),
                amount: betAmount,
            };
        } else {
            // Handle other cases
            newBets = {
                type: "single",
                numbers: [b],
                multiplier: calculateMultiplier([b]),
                amount: betAmount,
            };
        }

        const existingBetIndex = bets.findIndex(
            (bet) =>
                bet.type === newBets.type &&
                JSON.stringify(bet.numbers) === JSON.stringify(newBets.numbers)
        );

        if (existingBetIndex !== -1) {
            // If a bet exists with a different amount, replace it with the new amount
            if (bets[existingBetIndex].amount !== newBets.amount) {
                const updatedBets = [...bets];
                updatedBets[existingBetIndex] = newBets;
                setBets(updatedBets);
            } else {
                // If a bet exists with the same amount, delete the old bet
                const updatedBets = [...bets];
                updatedBets.splice(existingBetIndex, 1);
                setBets(updatedBets);
            }
        } else {
            // Add a new bet
            setBets([...bets, newBets]);
        }
    }

    function calculateMultiplier(numbers) {
        const totalNumbers = 36; // Assuming a standard roulette wheel with numbers 1 to 36

        if (numbers.length === 1) {
            // Single number bet
            return totalNumbers / 1;
        } else if (numbers.length === 12) {
            // Dozen bet (1st, 2nd, or 3rd 12)
            return 3; // Pays 2:1
        } else if (
            arraysEqual(numbers, redNumbers) ||
            arraysEqual(numbers, blackNumbers)
        ) {
            // Red or black bet
            return 2; // Pays 1:1
        } else if (
            arraysEqual(numbers, oddNumbers) ||
            arraysEqual(numbers, evenNumbers)
        ) {
            // Odd or even bet
            return 2; // Pays 1:1
        } else if (
            arraysEqual(numbers, oneto18) ||
            arraysEqual(numbers, nineteento36)
        ) {
            // 1 to 18 or 19 to 36 bet
            return 2; // Pays 1:1
        }

        // Default case (shouldn't happen if used correctly)
        return 1;
    }

    // Helper function to compare arrays
    function arraysEqual(arr1, arr2) {
        return (
            arr1.length === arr2.length &&
            arr1.every((value, index) => value === arr2[index])
        );
    }

    // const calculateTotalProfit = () => {
    //     let totalProfit = 0;

    //     bets.forEach((bet) => {
    //         if (bet.numbers.includes(winNumber)) {
    //             // The winning number is in the bet, calculate profit
    //             const profit = bet.amount * bet.multiplier;
    //             totalProfit += profit;
    //         }
    //     });

    //     return totalProfit;
    // };

    const calculateTotalBet = () => {
        let totalBet = 0;

        bets.forEach((bet) => {
            totalBet += bet.amount;
        });

        return totalBet;
    };

    const stopSpining = () => {
        setMustSpin(false);
        // const totalProfit =

        if (totalProfit > 0) {
            setMessage(`You won ${totalProfit} VroomVolts!`);
            setUserVroomVolts((prev) => prev + totalProfit);
        } else {
            setMessage("You lost!");
        }
    };

    console.log(bets);

    return (
        <div className="flex justify-center items-center flex-col w-1/3 h-fit rounded-xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAACdJREFUGFclirENAAAMguD/o220ixpQMYgEIKi2wQIKJojG5swePw9HKQkOQbvAHAAAAABJRU5ErkJggg==')] bg-repeat bg-[#7a2222]">
            <div className="mt-4 mb-4 flex justify-center w-11/12 relative">
                <h1 className="text-2xl text-white font-bold">{message}</h1>
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
                data={data}
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
            <div className="flex justify-between items-center w-3/4 my-2">
                <div
                    className="my-4 bg-[#ee0f82] text-white text-2xl py-2 rounded-lg px-5 font-extrabold cursor-pointer hover:bg-[#691239] transition-all duration-100 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={handleSpinClick}
                >
                    SPIN!
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-white text-lg font-bold">Total Bet:</p>
                    <p className="text-yellow-400 text-4xl font-extrabold">
                        {totalBet}
                    </p>
                </div>
                <div className="flex justify-center items-center max-w-[8rem]">
                    <button
                        type="button"
                        className="bg-gray-800 rounded-l-l rounded-r-none h-8 flex justify-center items-center"
                        onClick={() => {
                            setBetAmount((prev) => {
                                const newBet = prev - 5;
                                return newBet <= 0 ? 1 : newBet;
                            });
                        }}
                    >
                        <svg
                            className="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                            />
                        </svg>
                    </button>
                    <input
                        type="number"
                        id="bet-input"
                        data-input-counter
                        data-input-counter-min="1"
                        data-input-counter-max="5000"
                        className="w-24 text-2xl h-8 px-5 font-extrabold text-center bg-gray-950"
                        value={betAmount}
                        onChange={(e) => setBetAmount(parseInt(e.target.value))}
                        required
                        placeholder="Bet"
                        step="5"
                        min="5"
                        max="10000"
                    />
                    <button
                        type="button"
                        className="bg-gray-800 rounded-r-lg rounded-l-none h-8 flex justify-center items-center"
                        onClick={() => {
                            setBetAmount((prev) => {
                                const newBet = prev + 5;
                                return newBet <= 0 ? 1 : newBet;
                            });
                        }}
                    >
                        <svg
                            className="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <RouletaBoard bets={bets} handleBetClick={handleBetClick} />
        </div>
    );
}
