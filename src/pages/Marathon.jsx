import React, { useEffect, useState } from "react";
import TopNavigation from "../components/TopNavigation";
import useAxios from "../utils/useAxios";

export default function Marathon() {
  const api = useAxios();
  const [threeFirstVroomVolts, setThreeFirstVroomVolts] = useState([]);
  const [threeFirstHours, setThreeFirstHours] = useState([]);
  const [selectedOption, setSelectedOption] = useState("vroomvolts");

  useEffect(() => {
    getThreeFirstVroomVolts();
    getThreeFirstHours();
  }, []);

  const getThreeFirstVroomVolts = async () => {
    const response = await api.get("/vroomvolts/latest");
    const vroomvolts = response.data;
    if (vroomvolts && Array.isArray(vroomvolts)) {
      const topThree = vroomvolts.sort((a, b) => b.value - a.value).slice(0, 3);
      const topThreeWithUsernames = await Promise.all(
        topThree.map(async (entry) => {
          const userResponse = await api.get(`/users/${entry.user}/`);
          const user = userResponse.data;
          return {
            username: user.username,
            vroomvolts: entry.value,
          };
        })
      );
      setThreeFirstVroomVolts(topThreeWithUsernames);
    }
  };

  const getThreeFirstHours = async () => {
    const response = await api.get("/users/");
    const users = response.data;
    if (users && Array.isArray(users)) {
      const topThree = users
        .sort((a, b) => b.total_time - a.total_time)
        .slice(0, 3)
        .map((user) => {
          return {
            username: user.username,
            hours: user.total_time,
          };
        });
      console.log(topThree);
      setThreeFirstHours(topThree);
    } else {
      console.log("No data found");
      return null;
    }
  };

  const renderTable = (data, title, key) => (
    <div className="flex flex-col justify-start items-center h-80 w-[600px] mx-4 md:w-11/12 md:mt-4 bg-[#190C34] rounded-2xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
      <div className="text-2xl py-1 bg-[#473663] rounded-t-2xl w-full text-center">
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
              <span className="text-lg">{entry.username}</span>
            </div>
            <span className="text-lg font-semibold">
              {entry[key]} {key === "vroomvolts" ? "Vroomvolts" : "Hours"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-purple-900 via-black to-gray-900 text-white">
      <TopNavigation />

      {/* Switch Component */}
      <div className="flex items-center justify-center my-4 pt-20">
        <div className="relative inline-flex items-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-full">
          <div className="w-48 h-12 bg-purple-500 rounded-full relative flex items-center">
            {/* VroomVolts Option */}
            <span
              className={`w-1/2 text-center z-10 ${
                selectedOption === "vroomvolts"
                  ? "text-white"
                  : "text-gray-300 cursor-pointer"
              }`}
              onClick={() => {
                if (selectedOption !== "vroomvolts") {
                  setSelectedOption("vroomvolts");
                }
              }}
            >
              VroomVolts
            </span>
            {/* Hours Option */}
            <span
              className={`w-1/2 text-center z-10 ${
                selectedOption === "hours"
                  ? "text-white"
                  : "text-gray-300 cursor-pointer"
              }`}
              onClick={() => {
                if (selectedOption !== "hours") {
                  setSelectedOption("hours");
                }
              }}
            >
              Hours
            </span>
            {/* Switch thumb */}
            <div
              className={`absolute left-0 top-0 w-1/2 h-full bg-purple-700 rounded-full transform transition-transform duration-300 ${
                selectedOption === "hours" ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center w-full min-h-screen">
        {selectedOption === "vroomvolts" &&
          threeFirstVroomVolts.length > 0 &&
          renderTable(threeFirstVroomVolts, "Top 3 VroomVolts", "vroomvolts")}
        {selectedOption === "hours" &&
          threeFirstHours.length > 0 &&
          renderTable(threeFirstHours, "Top 3 Hours", "hours")}
      </div>
    </div>
  );
}
