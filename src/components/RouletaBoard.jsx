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
        <div className="w-full h-52 flex flex-col justify-start items-center my-4 relative">
            <div className="flex w-fit h-[133px] md:h-[100px] flex-col-reverse flex-wrap">
                {dataToMap.map((item, index) => (
                    <div
                        key={index}
                        className="flex w-11 relative h-11 md:w-7 md:h-7 md:text-xl justify-center items-center text-white text-2xl font-bold border-[1px] border-slate-200 cursor-pointer hover:opacity-80 transition-all duration-100"
                        style={item.style}
                        onClick={() => handleBet(item.option)}
                    >
                        {bets.findIndex((bet) => bet.bet === item.option) !==
                            -1 && (
                            <div className="absolute bottom-0 left-0 text-[16px] w-fit flex justify-center md:h-4 md:text-sm items-center h-5  text-[#112A46] bg-yellow-500 rounded-full">
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
            <div className="flex w-fit justify-center items-center h-11 ">
                <div
                    className="w-44 md:w-28 h-full relative text-center text-2xl bg-green-800 border-[1px] border-slate-200 cursor-pointer hover:opacity-80 transition-all duration-100"
                    onClick={() => handleBet("1st12")}
                >
                    {bets.findIndex((bet) => bet.bet === "1st12") !== -1 && (
                        <div className="absolute bottom-0 left-2 text-[16px] w-fit min-w-6 flex justify-center items-center h-6  text-[#112A46] bg-yellow-500 rounded-full">
                            {
                                bets[
                                    bets.findIndex((bet) => bet.bet === "1st12")
                                ].amount
                            }
                        </div>
                    )}
                    1st 12
                </div>
                <div
                    className="w-44 md:w-28 h-full relative text-center text-2xl bg-green-800 cursor-pointer border-[1px] border-slate-200 hover:opacity-80 transition-all duration-100"
                    onClick={() => handleBet("2nd12")}
                >
                    {bets.findIndex((bet) => bet.bet === "2nd12") !== -1 && (
                        <div className="absolute bottom-0 left-2 text-[16px] w-fit min-w-6 flex justify-center items-center h-6  text-[#112A46] bg-yellow-500 rounded-full">
                            {
                                bets[
                                    bets.findIndex((bet) => bet.bet === "2nd12")
                                ].amount
                            }
                        </div>
                    )}
                    2nd 12
                </div>
                <div
                    className="w-44 md:w-28 h-full relative text-center text-2xl bg-green-800 cursor-pointer border-[1px] border-slate-200 hover:opacity-80 transition-all duration-100"
                    onClick={() => handleBet("3rd12")}
                >
                    {bets.findIndex((bet) => bet.bet === "3rd12") !== -1 && (
                        <div className="absolute bottom-0 left-2 text-[16px] w-fit min-w-6 flex justify-center items-center h-6  text-[#112A46] bg-yellow-500 rounded-full">
                            {
                                bets[
                                    bets.findIndex((bet) => bet.bet === "3rd12")
                                ].amount
                            }
                        </div>
                    )}
                    3rd 12
                </div>
            </div>
            <div className="flex w-fit justify-center items-center h-11">
                <div className="w-44 md:w-28 flex justify-center items-center h-full">
                    <div
                        className="w-1/2 h-full relative md:text-xl text-center text-2xl bg-green-800 flex items-center justify-center border-[1px] border-slate-200 cursor-pointer hover:opacity-80 transition-all duration-100"
                        onClick={() => handleBet("1to18")}
                    >
                        {bets.findIndex((bet) => bet.bet === "1to18") !==
                            -1 && (
                            <div className="absolute bottom-0 left-2 text-[16px] w-fit min-w-6 flex justify-center items-center h-6  text-[#112A46] bg-yellow-500 rounded-full">
                                {
                                    bets[
                                        bets.findIndex(
                                            (bet) => bet.bet === "1to18"
                                        )
                                    ].amount
                                }
                            </div>
                        )}
                        1-18
                    </div>
                    <div
                        className="w-1/2 h-full relative md:text-xl text-center text-2xl bg-gray-800 flex items-center justify-center cursor-pointer border-[1px] border-slate-200 hover:opacity-80 transition-all duration-100"
                        onClick={() => handleBet("even")}
                    >
                        {bets.findIndex((bet) => bet.bet === "even") !== -1 && (
                            <div className="absolute bottom-0 left-2 text-[16px] w-fit min-w-6 flex justify-center items-center h-6  text-[#112A46] bg-yellow-500 rounded-full">
                                {
                                    bets[
                                        bets.findIndex(
                                            (bet) => bet.bet === "even"
                                        )
                                    ].amount
                                }
                            </div>
                        )}
                        Even
                    </div>
                </div>
                <div className="w-44 md:w-28 flex justify-center items-center h-full">
                    <div
                        className="w-1/2 h-full relative text-center md:text-xl text-2xl bg-red-600 flex items-center justify-center cursor-pointer border-[1px] border-slate-200 hover:opacity-80 transition-all duration-100"
                        onClick={() => handleBet("red")}
                    >
                        {bets.findIndex((bet) => bet.bet === "red") !== -1 && (
                            <div className="absolute bottom-0 left-2 text-[16px] w-fit min-w-6 flex justify-center items-center h-6  text-[#112A46] bg-yellow-500 rounded-full">
                                {
                                    bets[
                                        bets.findIndex(
                                            (bet) => bet.bet === "red"
                                        )
                                    ].amount
                                }
                            </div>
                        )}
                        Red
                    </div>
                    <div
                        className="w-1/2 h-full text-center relative  md:text-xl text-2xl flex items-center justify-center bg-black border-[1px] border-slate-200 cursor-pointer hover:opacity-80 transition-all duration-100"
                        onClick={() => handleBet("black")}
                    >
                        {bets.findIndex((bet) => bet.bet === "black") !==
                            -1 && (
                            <div className="absolute bottom-0 left-2 text-[16px] w-fit min-w-6 flex justify-center items-center h-6  text-[#112A46] bg-yellow-500 rounded-full">
                                {
                                    bets[
                                        bets.findIndex(
                                            (bet) => bet.bet === "black"
                                        )
                                    ].amount
                                }
                            </div>
                        )}
                        Black
                    </div>
                </div>
                <div className="w-44 md:w-28 flex justify-center items-center h-full">
                    <div
                        className="w-1/2 h-full text-center relative md:text-xl text-2xl flex items-center justify-center bg-gray-800 cursor-pointer border-[1px] border-slate-200 hover:opacity-80 transition-all duration-100"
                        onClick={() => handleBet("odd")}
                    >
                        {bets.findIndex((bet) => bet.bet === "odd") !== -1 && (
                            <div className="absolute bottom-0 left-2 text-[16px] w-fit min-w-6 flex justify-center items-center h-6  text-[#112A46] bg-yellow-500 rounded-full">
                                {
                                    bets[
                                        bets.findIndex(
                                            (bet) => bet.bet === "odd"
                                        )
                                    ].amount
                                }
                            </div>
                        )}
                        Odd
                    </div>
                    <div
                        className="w-1/2 h-full text-center text-2xl md:text-xl flex items-center justify-center relative bg-green-800 cursor-pointer border-[1px] border-slate-200 hover:opacity-80 transition-all duration-100"
                        onClick={() => handleBet("19to36")}
                    >
                        {bets.findIndex((bet) => bet.bet === "19to36") !==
                            -1 && (
                            <div className="absolute bottom-0 left-2 text-[16px] w-fit min-w-6 flex justify-center items-center h-6  text-[#112A46] bg-yellow-500 rounded-full">
                                {
                                    bets[
                                        bets.findIndex(
                                            (bet) => bet.bet === "19to36"
                                        )
                                    ].amount
                                }
                            </div>
                        )}
                        19-36
                    </div>
                </div>
            </div>
            <div className="md:flex">
                <div
                    className="flex justify-center items-center h-28 absolute top-0 left-4 md:relative md:top-0 md:left-0 md:w-20 md:h-8 bg-[#148001] w-10 text-white text-2xl font-bold border-[1px] border-slate-200 cursor-pointer hover:opacity-80 transition-all duration-100"
                    onClick={() => handleBet("zero")}
                >
                    {bets.findIndex((bet) => bet.bet === "zero") !== -1 && (
                        <div className="absolute bottom-0 left-2 text-[16px] w-fit min-w-6 flex justify-center items-center h-6  text-[#112A46] bg-yellow-500 rounded-full">
                            {
                                bets[
                                    bets.findIndex((bet) => bet.bet === "zero")
                                ].amount
                            }
                        </div>
                    )}
                    0
                </div>
                <div
                    className="flex justify-center items-center h-24 absolute top-28 md:relative md:top-0 md:w-20 md:h-8 left-4 md:left-0 bg-[#148001] w-10 text-white text-2xl font-bold border-[1px] border-slate-200 cursor-pointer hover:opacity-80 transition-all duration-100 "
                    onClick={() => handleBet("double_zero")}
                >
                    {bets.findIndex((bet) => bet.bet === "double_zero") !==
                        -1 && (
                        <div className="absolute bottom-0 left-2 text-[16px] w-fit min-w-6 flex justify-center items-center h-6  text-[#112A46] bg-yellow-500 rounded-full">
                            {
                                bets[
                                    bets.findIndex(
                                        (bet) => bet.bet === "double_zero"
                                    )
                                ].amount
                            }
                        </div>
                    )}
                    00
                </div>
            </div>
        </div>
    );
}
