import React from "react";
import { FaMedal } from "react-icons/fa";
import { FcClock } from "react-icons/fc";
import coin from "../assets/coin.png"; // Adjust the import path as needed
import secondsFormat from "../utils/secondsFormat";
const RankTable = ({ data, title, dataKey }) => {
  const medalColors = ["text-yellow-500", "text-gray-400", "text-orange-500"];

  return (
    <div className="flex flex-col justify-start items-center w-[600px] mx-4 md:w-11/12 md:mt-4 bg-[#190C34] rounded-2xl shadow-lg">
      <div className="text-2xl font-bold py-3 md:py-6 bg-[#473663] rounded-t-2xl w-full text-center">
        {title}
      </div>
      <ul className="w-full p-4 space-y-4">
        {data.map((entry, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-4 rounded-lg transition-transform transform hover:scale-105 hover:bg-opacity-80 shadow-md ${
              index === 0
                ? "bg-gradient-to-r from-yellow-600 to-yellow-400"
                : index === 1
                ? "bg-gradient-to-r from-gray-600 to-gray-400"
                : index === 2
                ? "bg-gradient-to-r from-orange-600 to-orange-400"
                : "bg-gradient-to-r from-blue-400 to-blue-600"
            } hover:shadow-lg`}
          >
            <div className="flex items-center space-x-4">
              {index < 3 ? (
                <FaMedal className={`w-6 h-6 ${medalColors[index]}`} />
              ) : (
                <span className="text-xl font-bold">{index + 1}.</span>
              )}
              <div className="relative">
                <img
                  src={entry.image}
                  alt={entry.username}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                />
                {index < 3 && (
                  <span className="absolute bottom-0 right-0 bg-purple-500 text-white text-xs rounded-full px-1">
                    #{index + 1}
                  </span>
                )}
              </div>
              <span className="text-lg">{entry.username}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg md:text-sm text-right font-semibold">
                {dataKey==="vroomvolts"? entry[dataKey]:secondsFormat(entry[dataKey])}
              </span>
              {dataKey === "vroomvolts" ? (
                <img className="w-8 h-8" src={coin} alt="Coin" />
              ) : (
                <FcClock className="w-8 h-8 text-black" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankTable;
