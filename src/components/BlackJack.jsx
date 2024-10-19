import React, { useState } from "react";
import InfoModal from "./InfoModal";
import { FaCircleInfo } from "react-icons/fa6";
import PlayingCard from "./PlayingCard";
export default function BlackJack({ vrroomvolts, setVroomvolts }) {
    const [bet, setBet] = useState(0);
    const [enemyCards, setEnemyCards] = useState(["2B", "2B"]);
    const [myCards, setMyCards] = useState(["2B", "3S"]);

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
                content="Now, you're in control of the stakes! Bet as much as you dare and go for double or nothing. Whether you're feeling lucky or playing it smart, the choice is yours. Bet big, and you could double your Vroomvolts in an instant — but don't forget, it’s all or nothing. Ready to go all in? Let’s see if luck is on your side..."
            />

            <div className="flex w-full h-full justify-center items-center flex-col  ">
                <div className="w-5/6 flex justify-center items-center my-2 bg-[#00000094] rounded-xl relative flex-wrap h-fit pt-10 pb-4">
                    <h2 className="absolute top-2 text-xl font-bold text-[#ff4229]">
                        Opponent's Cards
                    </h2>
                    {enemyCards.map((card, index) => (
                        <PlayingCard key={index} card={card} />
                    ))}
                </div>
                <div className="w-5/6 flex justify-center items-center my-2  bg-[#00000094] rounded-xl relative flex-wrap h-fit pt-10 pb-4">
                    <h2 className="absolute top-2 text-xl font-bold text-[#50ff29]">
                        Your Cards
                    </h2>
                    {myCards.map((card, index) => (
                        <PlayingCard key={index} card={card} />
                    ))}
                </div>
                <button className="my-4 bg-[#ee0f82] text-white text-2xl py-2 h-12 rounded-lg px-5 font-extrabold cursor-pointer hover:bg-[#691239] transition-all duration-100 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-60">
                    Start Game!
                </button>
            </div>
        </div>
    );
}
