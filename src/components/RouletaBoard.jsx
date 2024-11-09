import React from "react";
import { optionData } from "../utils/RouletaData";
export default function RouletaBoard({ bets, setBets, betAmount }) {
    let newData = [...optionData];
    newData.sort((a, b) => a.option - b.option);
    const dataToMap = newData.slice(2, newData.length);

    const handleBet = (option) => {
        const newBet = { bet: option, amount: betAmount };
        const existingBetIndex = bets.findIndex((bet) => bet.bet === option);
        if (existingBetIndex !== -1) {
            const updatedBets = [...bets];
            updatedBets[existingBetIndex].amount += betAmount;
            setBets(updatedBets);
        } else {
            setBets([...bets, newBet]);
        }
    };

    return (
        <div className="w-full h-52 flex flex-col justify-start items-center my-4">
            <div className="flex w-fit h-[133px] flex-col-reverse flex-wrap">
                {dataToMap.map((item, index) => (
                    <div
                        key={index}
                        className="flex w-11 relative h-11 justify-center items-center text-white text-2xl font-bold border-[1px] border-slate-200 cursor-pointer hover:opacity-60 transition-all duration-100"
                        style={item.style}
                        onClick={() => handleBet(item.option)}
                    >
                        {bets.findIndex((bet) => bet.bet === item.option) !==
                            -1 && (
                            <div className="absolute bottom-0 left-0 text-[16px] w-fit flex justify-center items-center h-5  text-[#112A46] bg-yellow-500 rounded-full">
                                {
                                    bets[
                                        bets.findIndex(
                                            (bet) => bet.bet === item.option
                                        )
                                    ].amount
                                }
                            </div>
                        )}
                        {item.option}
                    </div>
                ))}
            </div>
            <div className="flex w-fit justify-center items-center h-11">
                <div className="w-44 h-full text-center text-2xl bg-green-800 border-[1px] border-slate-200 cursor-pointer hover:opacity-60 transition-all duration-100">
                    1st 12
                </div>
                <div className="w-44 h-full text-center text-2xl bg-green-800 cursor-pointer border-[1px] border-slate-200 hover:opacity-60 transition-all duration-100">
                    2nd 12
                </div>
                <div className="w-44 h-full text-center text-2xl bg-green-800 cursor-pointer border-[1px] border-slate-200 hover:opacity-60 transition-all duration-100">
                    3rd 12
                </div>
            </div>
            <div className="flex w-fit justify-center items-center h-11">
                <div className="w-44 flex justify-center items-center h-full">
                    <div className="w-1/2 h-full text-center text-2xl bg-green-800 border-[1px] border-slate-200 cursor-pointer hover:opacity-60 transition-all duration-100">
                        1-18
                    </div>
                    <div className="w-1/2 h-full text-center text-2xl bg-gray-800 cursor-pointer border-[1px] border-slate-200 hover:opacity-60 transition-all duration-100">
                        Even
                    </div>
                </div>
                <div className="w-44 flex justify-center items-center h-full">
                    <div className="w-1/2 h-full text-center text-2xl bg-red-600 cursor-pointer border-[1px] border-slate-200 hover:opacity-60 transition-all duration-100">
                        Red
                    </div>
                    <div className="w-1/2 h-full text-center text-2xl bg-black border-[1px] border-slate-200 cursor-pointer hover:opacity-60 transition-all duration-100">
                        Black
                    </div>
                </div>
                <div className="w-44 flex justify-center items-center h-full">
                    <div className="w-1/2 h-full text-center text-2xl bg-gray-800 cursor-pointer border-[1px] border-slate-200 hover:opacity-60 transition-all duration-100">
                        Odd
                    </div>
                    <div className="w-1/2 h-full text-center text-2xl bg-green-800 cursor-pointer border-[1px] border-slate-200 hover:opacity-60 transition-all duration-100">
                        19-36
                    </div>
                </div>
            </div>
        </div>
    );
}
