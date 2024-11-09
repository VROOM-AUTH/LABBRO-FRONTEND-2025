import React from "react";

export default function BetInput({ betAmount, setBetAmount }) {
    return (
        <div className="flex justify-center items-center max-w-[8rem]">
            <button
                type="button"
                className="bg-gray-800 rounded-l-l rounded-r-none h-8 flex justify-center items-center"
                onClick={() => {
                    setBetAmount((prev) => {
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
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                required
            />
            <button
                type="button"
                className="bg-gray-800 rounded-r-lg rounded-l-none h-8 flex justify-center items-center"
                onClick={() => {
                    setBetAmount((prev) => {
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
    );
}
