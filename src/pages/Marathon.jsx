import React, { useState } from "react";
import TopNavigation from "../components/TopNavigation";
import useAxios from "../utils/useAxios";

export default function Marathon() {
  const api = useAxios();
  const [threeFirstVroomVolts, setThreeFirstVroomVolts] = useState([]);
  const [threeFirstHours, setThreeFirstHours] = useState([]);

  const getThreeFirstVroomVolts = async () => {
    const response = await api.get("/vroomvolts/latest");
    const vroomvolts = response.data;
    if (vroomvolts && Array.isArray(vroomvolts)) {
      const topThree = vroomvolts
        .sort((a, b) => b.value - a.value) // Sort by value in descending order
        .slice(0, 3); // Get the top three entries
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
      console.log(topThreeWithUsernames);
      setThreeFirstVroomVolts(topThreeWithUsernames);

      return topThree;
    } else {
      console.log("No data found");
      return null;
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

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <TopNavigation />
      <h1 className="text-2xl">Marathon</h1>
      <button onClick={getThreeFirstVroomVolts}>Get 3 first VroomVolts</button>
      {threeFirstVroomVolts.length > 0 && (
        <ul>
          {threeFirstVroomVolts.map((entry, index) => (
            <li key={index}>
              {entry.username}: {entry.vroomvolts}
            </li>
          ))}
        </ul>
      )}
      <button onClick={getThreeFirstHours}>Get 3 first Hours</button>
      {threeFirstHours.length > 0 && (
        <ul>
          {threeFirstHours.map((entry, index) => (
            <li key={index}>
              {entry.username}: {entry.hours}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
