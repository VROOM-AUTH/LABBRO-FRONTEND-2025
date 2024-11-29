import React from "react";

export const rankTable = (data, title, key) => (
  <div className="flex flex-col justify-start items-center  w-[600px] mx-4 md:w-11/12 md:mt-4 bg-[#190C34] rounded-2xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
    <div className="text-2xl py-3 md:py-6 bg-[#473663] rounded-t-2xl w-full text-center">
      {title}
    </div>
    <ul className="w-full p-4 space-y-4">
      {data.map((entry, index) => (
        <li
          key={index}
          className={`flex justify-between items-center p-4 rounded-lg transition shadow-md ${
            index === 0
              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
              : index === 1
              ? "bg-gradient-to-r from-gray-400 to-gray-600"
              : "bg-gradient-to-r from-orange-400 to-orange-600"
          }`}
        >
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold">{index + 1}.</span>

            <span className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={entry.image}
                className="w-12 h-12 rounded-full object-cover"
              />
            </span>
            <span className="text-lg">{entry.username}</span>
          </div>
          <span className="text-lg  md:text-sm text right font-semibold">
            {entry[key]} {key === "vroomvolts" ? "VroomVolts" : "Hours"}
          </span>
        </li>
      ))}
    </ul>
  </div>
);
