import React, { useEffect, useState } from "react";
import TopNavigation from "../components/TopNavigation";
import useAxios from "../utils/useAxios";

export default function Marathon() {
  const api = useAxios();
  const [threeFirstVroomVolts, setThreeFirstVroomVolts] = useState([]);
  const [threeFirstHours, setThreeFirstHours] = useState([]);
  const [selectedOption, setSelectedOption] = useState("vroomvolts");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getUsers();
      await getThreeFirstVroomVolts(usersData);
      await getThreeFirstHours(usersData);
    };
    fetchData();
  }, []);

  const getUsers = async () => {
    const response = await api.get("/users/");
    const usersData = response.data;
    if (usersData && Array.isArray(usersData)) {
      setUsers(usersData);
      console.log(usersData);
      return usersData;
    } else {
      console.log("No data found");
      return [];
    }
  };

  const getThreeFirstVroomVolts = async (usersData) => {
    const response = await api.get("/vroomvolts/latest");
    const vroomvolts = response.data;
    if (vroomvolts && Array.isArray(vroomvolts)) {
      const topThree = vroomvolts.sort((a, b) => b.value - a.value).slice(0, 3);
      const topThreeWithUsernames = topThree.map((entry) => {
        const user = usersData.find((u) => u.id === entry.user);
        return {
          username: user ? user.username : "Unknown",
          vroomvolts: entry.value,
          image: user ? user.image : null,
        };
      });
      console.log("Top Three by VroomVolts", topThreeWithUsernames, usersData);
      setThreeFirstVroomVolts(topThreeWithUsernames);
    }
  };

  const getThreeFirstHours = async (usersData) => {
    if (usersData && Array.isArray(usersData)) {
      const topThree = usersData
        .sort((a, b) => b.total_time - a.total_time)
        .slice(0, 3)
        .map((user) => {
          return {
            username: user.username,
            hours: user.total_time,
            image: user.image,
          };
        });
      console.log("Top Three by Hours", topThree);
      setThreeFirstHours(topThree);
    } else {
      console.log("No data found");
      return null;
    }
  };

  const renderTable = (data, title, key) => (
    <div className="flex flex-col justify-start items-center  w-[600px] mx-4 md:w-11/12 md:mt-4 bg-[#190C34] rounded-2xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
      <div className="text-2xl py-3 bg-[#473663] rounded-t-2xl w-full text-center">
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
            <span className="text-lg text right font-semibold">
              {entry[key]} {key === "vroomvolts" ? "Vroomvolts" : "Hours"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col items-center  justify-center w-full min-h-screen text-white">
      <TopNavigation />

      <div className="relative w-full flex justify-center items-center  pb-5">
        {/* Container for Switch and Table */}
        <div className="w-[600px] md:w-11/12 relative">
          {/* Switch Component Positioned Above */}
          <div className="absolute top-3 -right-1.5">
            <div className="relative inline-flex items-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-xl">
              <div className="w-44 h-8 bg-purple-500 rounded-xl relative flex items-center">
                {/* VroomVolts Option */}
                <span
                  className={`w-1/2 text-center z-10 text-xs ${
                    selectedOption === "vroomvolts"
                      ? "text-white font-bold"
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
                  className={`w-1/2 text-center z-10 text-xs ${
                    selectedOption === "hours"
                      ? "text-white font-bold"
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
                  className={`absolute left-0 top-0 w-1/2 h-full bg-purple-700 rounded-xl transform transition-transform duration-300 ${
                    selectedOption === "hours" ? "translate-x-full" : ""
                  }`}
                ></div>
              </div>
            </div>
          </div>

          {/* Render Table */}
          {selectedOption === "vroomvolts" &&
            threeFirstVroomVolts.length > 0 &&
            renderTable(threeFirstVroomVolts, "Top 3 VroomVolts", "vroomvolts")}
          {selectedOption === "hours" &&
            threeFirstHours.length > 0 &&
            renderTable(threeFirstHours, "Top 3 Hours", "hours")}
        </div>
      </div>
    </div>
  );
}
