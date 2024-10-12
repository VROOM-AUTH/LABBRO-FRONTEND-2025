import React, { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function RecentVroomvolts({ users }) {
    const navigate = useNavigate();
    const api = useAxios();
    const [recentVroomvolts, setRecentVroomvolts] = useState(null);
    useEffect(() => {
        const halfMinute = 30 * 1000;
        api.get("/vroomvolts/recent/").then((response) => {
            if (response.data) {
                setRecentVroomvolts(response.data);
            }
        });
        const interval = setInterval(() => {
            api.get("/vroomvolts/recent/").then((response) => {
                if (response.data) {
                    setRecentVroomvolts(response.data);
                }
            });
        }, halfMinute);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const slicedVroomvolts = recentVroomvolts?.slice(0, 5);

    return (
        <div className="flex justify-center items-center w-full flex-col bg-[#190C34] rounded-xl mt-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
            <h1 className="text-2xl w-full text-center bg-[#473663] rounded-t-lg py-1 flex items-center justify-center">
                Vroomvolts Trend
            </h1>
            {slicedVroomvolts ? (
                <div className="flex flex-col justify-start h-fit items-center w-fit md:w-3/5 md:mb-8">
                    {slicedVroomvolts.map((entry, index) => (
                        <div
                            className="flex justify-between items-center my-2 w-52 h-14 px-2 rounded-xl cursor-pointer transition-all duration-100 hover:scale-110 md:w-full bg-[#f7c10d] text-black "
                            style={{ opacity: (100 - index * 7) / 100 }} // dynamically setting opacity
                            key={index}
                            onClick={() =>
                                navigate(`/profile/${entry.user_id}`)
                            }
                        >
                            <img
                                className="w-12 h-12 rounded-full mr-2 "
                                src={
                                    users.find((u) => u.id === entry.user_id)
                                        ?.image
                                }
                            ></img>
                            <p className="font-bold text-left w-20">
                                {
                                    users.find((u) => u.id === entry.user_id)
                                        ?.username
                                }
                            </p>
                            {entry.gain ? (
                                <FaAngleDoubleUp className="w-8 h-8 text-green-500" />
                            ) : (
                                <FaAngleDoubleDown className="w-8 h-8 text-red-500" />
                            )}
                            <p className="text-right text-xl font-extrabold">
                                {entry?.difference}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <span className="loading loading-dots loading-sm"></span>
            )}
        </div>
    );
}
