import React, { useEffect, useState } from "react";
import InfoModal from "./InfoModal";
import { FaCircleInfo } from "react-icons/fa6";
import PlayingCard from "./PlayingCard";
import useAxios from "../utils/useAxios";

export default function BlackJack({ vroomvolts, setVroomvolts }) {
    const api = useAxios();
    const [bet, setBet] = useState(5);
    const [firstTime, setFirstTime] = useState(true);
    const [enemyCards, setEnemyCards] = useState(["2B", "2B"]);
    const [myCards, setMyCards] = useState(["2B", "2B"]);
    const [wonVroomvolts, setWonVroomvolts] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        startGame(false);
    }, []);

    const startGame = (hit) => {
        if (hit && bet > vroomvolts && firstTime) {
            setErrorMessage("You don't have enough Vroomvolts!");
            return;
        }
        if (hit && bet <= 0 && firstTime) {
            setErrorMessage("You have to bet at least 1 Vroomvolt!");
            return;
        }
        if (hit && firstTime) {
            setEnemyCards(["2B", "2B"]);
            setVroomvolts(vroomvolts - bet);
            setWonVroomvolts(null);
            setFirstTime(false);
        } else if (!hit && !firstTime) {
            setFirstTime(true);
        }
        api.post("/blackjack/", { bet: bet, hit: hit }).then((response) => {
            if (response.data) {
                console.log(response.data);
                setMyCards(response.data.userHand);
                if (response.data.manaHand) {
                    setEnemyCards(response.data.manaHand);
                }
                if (response.data.wonVroomvolts !== undefined) {
                    setWonVroomvolts(response.data.wonVroomvolts);
                    setVroomvolts((prev) => prev + response.data.wonVroomvolts);
                }
            }
        });
    };
    return (
        <div className="w-2/4 bg-[#17760c] rounded-xl h-fit flex flex-col justify-start items-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-[radial-gradient(#00000094_1px,transparent_1px)] [background-size:8px_8px] md:w-11/12 md:h-fit md:mt-8 md:mb-16 overflow-hidden">
            <div className="mb-4 flex justify-center items-center w-full relative h-12 bg-[#0c4705]">
                <h1 className="text-2xl text-white font-bold">Blackjack</h1>
                <FaCircleInfo
                    className="text-white text-3xl absolute right-4 cursor-pointer hover:text-[#ee0f82] transition-all duration-100"
                    onClick={() =>
                        document.getElementById("blackjackModal").showModal()
                    }
                />
            </div>
            <InfoModal
                id="blackjackModal"
                title="Blackjack Game"
                content="Take control of the stakes! Bet boldly and aim for double or nothing as each round brings a fresh shuffle of the deck. Will you play it safe or risk it all? Bet big to potentially double your Vroomvolts in an instant, but remember: it’s all or nothing! Are you ready to go all in? Let’s find out..."
            />

            <div className="flex w-full h-full justify-center items-center flex-col  ">
                <div className="w-4/5 flex justify-center items-center my-2 bg-[#00000094] rounded-xl relative flex-wrap h-fit pt-10 pb-4">
                    <h2 className="absolute top-2 text-xl font-bold text-[#ff4229]">
                        Opponent's Cards
                    </h2>
                    {enemyCards.map((card, index) => (
                        <PlayingCard key={index} card={card} />
                    ))}
                </div>
                <div className="w-4/5 flex justify-center items-center my-2  bg-[#00000094] rounded-xl relative flex-wrap h-fit pt-10 pb-4">
                    <h2 className="absolute top-2 text-xl font-bold text-[#50ff29]">
                        Your Cards
                    </h2>
                    {myCards.map((card, index) => (
                        <PlayingCard key={index} card={card} />
                    ))}
                </div>
                {firstTime ? (
                    <div className="flex justify-evenly items-center w-full md:flex-col">
                        <div className="flex flex-col justify-center items-center">
                            <h2 className="text-white text-l font-bold bg-gray-950 px-4 mb-1 rounded-md">
                                Bet Amount
                            </h2>
                            <div className="flex justify-center items-center max-w-[8rem]">
                                <button
                                    type="button"
                                    className="bg-gray-800 rounded-l-l rounded-r-none h-8 flex justify-center items-center"
                                    onClick={() => {
                                        setBet((prev) => {
                                            const newBet = prev - 1;
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
                                    type="text"
                                    id="quantity-input"
                                    data-input-counter
                                    data-input-counter-min="1"
                                    data-input-counter-max="5000"
                                    className="w-24 text-2xl h-8 px-5 font-extrabold text-center bg-gray-950"
                                    placeholder="999"
                                    value={bet}
                                    onChange={(e) => setBet(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="bg-gray-800 rounded-r-lg rounded-l-none h-8 flex justify-center items-center"
                                    onClick={() => {
                                        setBet((prev) => {
                                            const newBet = prev + 1;
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
                        <button
                            onClick={() => startGame(true)}
                            className="my-4 bg-[#ee0f82] text-white text-2xl py-2 h-12 rounded-lg px-5 font-extrabold cursor-pointer hover:bg-[#691239] transition-all duration-100 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Start Game!
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-around items-center w-1/3 md:w-11/12">
                        <button
                            onClick={() => startGame(true)}
                            className="my-4 bg-[#ee0f82] text-white w-24 text-2xl py-2 h-12 rounded-lg px-5 font-extrabold cursor-pointer hover:bg-[#691239] "
                        >
                            Hit!
                        </button>
                        <button
                            onClick={() => startGame(false)}
                            className="my-4 bg-[#328bea] text-white w-24 text-2xl py-2 h-12 rounded-lg px-5 font-extrabold cursor-pointer"
                        >
                            Stop!
                        </button>
                    </div>
                )}

                {wonVroomvolts > 0 ? (
                    <h1 className="text-2xl font-bold text-pink-500 bg-white px-2 rounded-lg mb-2">
                        You won {wonVroomvolts} Vroomvolts!
                    </h1>
                ) : wonVroomvolts === 0 ? (
                    <h1 className="text-2xl font-bold text-pink-500 bg-white px-2 rounded-lg mb-2">
                        You lost!
                    </h1>
                ) : null}

                {errorMessage && (
                    <p className="text-red-600 font-bold text-xl bg-white rounded-lg px-2 mb-2">
                        {errorMessage}
                    </p>
                )}
            </div>
        </div>
    );
}
