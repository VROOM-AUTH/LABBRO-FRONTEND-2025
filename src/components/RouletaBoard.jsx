import React from "react";

import "./Rouleta.css";
export default function RouletaBoard({ bets, handleBetClick }) {
    const boardNumbers = [
        3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 2, 5, 8, 11, 14, 17, 20,
        23, 26, 29, 32, 35, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34,
    ];
    return (
        <div className="roulette-bet-board">
            {Array.from({ length: 3 }).map((_, rowIndex) => (
                <div className="roulette-bet-row" key={rowIndex}>
                    {boardNumbers
                        .slice(rowIndex * 12, (rowIndex + 1) * 12)
                        .map((number) => {
                            const bet = bets.find(
                                (bet) => bet.numbers[0] === number
                            );
                            const isRed = [
                                1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25,
                                27, 30, 32, 34, 36,
                            ].includes(number);
                            const activeClass = bet ? "bet-active" : "";
                            const colorClass = isRed
                                ? "bet-number-r"
                                : "bet-number";

                            return (
                                <div
                                    key={number}
                                    className={`${colorClass} ${activeClass}`}
                                    onClick={() => handleBetClick(number)}
                                >
                                    {number}
                                    {bet && bet.amount !== 0 && (
                                        <p className="bet-amount">
                                            {bet.amount}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                </div>
            ))}
            <div className="roulette-bet-row">
                <div
                    className={
                        bets.some(
                            (bet) =>
                                bet.type === "dozen" && bet.numbers.includes(1)
                        )
                            ? "bet-number-categ bet-active"
                            : "bet-number-categ"
                    }
                    onClick={() => handleBetClick(112)}
                >
                    1st 12
                    {bets.some(
                        (bet) => bet.type === "dozen" && bet.numbers.includes(1)
                    )?.amount !== 0 && (
                        <p className="bet-amount">
                            {
                                bets.find(
                                    (bet) =>
                                        bet.type === "dozen" &&
                                        bet.numbers.includes(1)
                                )?.amount
                            }
                        </p>
                    )}
                </div>
                <div
                    className={
                        bets.some(
                            (bet) =>
                                bet.type === "dozen" && bet.numbers.includes(13)
                        )
                            ? "bet-number-categ bet-active"
                            : "bet-number-categ"
                    }
                    onClick={() => handleBetClick(212)}
                >
                    2nd 12
                    {bets.some(
                        (bet) =>
                            bet.type === "dozen" && bet.numbers.includes(13)
                    )?.amount !== 0 && (
                        <p className="bet-amount">
                            {
                                bets.find(
                                    (bet) =>
                                        bet.type === "dozen" &&
                                        bet.numbers.includes(13)
                                )?.amount
                            }
                        </p>
                    )}
                </div>
                <div
                    className={
                        bets.some(
                            (bet) =>
                                bet.type === "dozen" && bet.numbers.includes(25)
                        )
                            ? "bet-number-categ bet-active"
                            : "bet-number-categ"
                    }
                    onClick={() => handleBetClick(312)}
                >
                    3d 12
                    {bets.some(
                        (bet) =>
                            bet.type === "dozen" && bet.numbers.includes(25)
                    )?.amount !== 0 && (
                        <p className="bet-amount">
                            {
                                bets.find(
                                    (bet) =>
                                        bet.type === "dozen" &&
                                        bet.numbers.includes(25)
                                )?.amount
                            }
                        </p>
                    )}
                </div>
            </div>
            <div className="roulette-bet-row">
                <div
                    className={
                        bets.some((bet) => bet.type === "oneto18")
                            ? "bet-number-categ bet-active"
                            : "bet-number-categ"
                    }
                    onClick={() => handleBetClick(118)}
                >
                    1 to 18
                    {bets.some((bet) => bet.type === "oneto18")?.amount !==
                        0 && (
                        <p className="bet-amount">
                            {bets.find((bet) => bet.type === "oneto18")?.amount}
                        </p>
                    )}
                </div>
                <div
                    className={
                        bets.some((bet) => bet.numbers[0] === 0)
                            ? "bet-number-g bet-active"
                            : "bet-number-g"
                    }
                    onClick={() => handleBetClick(0)}
                >
                    0
                    {bets.some((bet) => bet.numbers[0] === 0)?.amount !== 0 && (
                        <p className="bet-amount">
                            {bets.find((bet) => bet.numbers[0] === 0)?.amount}
                        </p>
                    )}
                </div>
                <div
                    className={
                        bets.some((bet) => bet.type === "even")
                            ? "bet-number-categ bet-active"
                            : "bet-number-categ"
                    }
                    onClick={() => handleBetClick(-4)}
                >
                    Even
                    {bets.some((bet) => bet.type === "even")?.amount !== 0 && (
                        <p className="bet-amount">
                            {bets.find((bet) => bet.type === "even")?.amount}
                        </p>
                    )}
                </div>
                <div
                    className={
                        bets.some((bet) => bet.type === "red")
                            ? "bet-number-r bet-active"
                            : "bet-number-r"
                    }
                    onClick={() => handleBetClick(-1)}
                >
                    Red
                    {bets.some((bet) => bet.type === "red")?.amount !== 0 && (
                        <p className="bet-amount">
                            {bets.find((bet) => bet.type === "red")?.amount}
                        </p>
                    )}
                </div>
                <div
                    className={
                        bets.some((bet) => bet.type === "black")
                            ? "bet-number bet-active"
                            : "bet-number"
                    }
                    onClick={() => handleBetClick(-2)}
                >
                    Black
                    {bets.some((bet) => bet.type === "black")?.amount !== 0 && (
                        <p className="bet-amount">
                            {bets.find((bet) => bet.type === "black")?.amount}
                        </p>
                    )}
                </div>
                <div
                    className={
                        bets.some((bet) => bet.type === "odd")
                            ? "bet-number-categ bet-active"
                            : "bet-number-categ"
                    }
                    onClick={() => handleBetClick(-3)}
                >
                    Odd
                    {bets.some((bet) => bet.type === "odd")?.amount !== 0 && (
                        <p className="bet-amount">
                            {bets.find((bet) => bet.type === "odd")?.amount}
                        </p>
                    )}
                </div>
                <div className="bet-number-g">00</div>
                <div
                    className={
                        bets.some((bet) => bet.type === "nineteento36")
                            ? "bet-number-categ bet-active"
                            : "bet-number-categ"
                    }
                    onClick={() => handleBetClick(1936)}
                >
                    19 to 36
                    {bets.some((bet) => bet.type === "nineteento36")?.amount !==
                        0 && (
                        <p className="bet-amount">
                            {
                                bets.find((bet) => bet.type === "nineteento36")
                                    ?.amount
                            }
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
