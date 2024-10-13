import React, { useEffect, useState } from "react";
import formatDataForActivity from "../utils/formatDataForActivity";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { CustomXAxisTick } from "./CustomChartElements";
import useAxios from "../utils/useAxios";
import formatDate from "../utils/dateFormat";
import coin from "../assets/coin.png";

export default function UserVroomvoltsGraph({ userId }) {
    const api = useAxios();
    const [vroomvoltsData, setVroomvoltsData] = useState(null);
    useEffect(() => {
        api.get(`/vroomvolts/user/${userId}`).then((response) => {
            if (response.data) {
                console.log(response.data);
                setVroomvoltsData(response.data);
            }
        });
    }, [userId]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#e3f4f2] w-28 h-16 rounded-xl flex justify-center items-center flex-col">
                    <div className="text-black">
                        {/* False for hour only, true for date only in graph mode */}
                        {formatDate(
                            payload[0].payload.last_updated,
                            false,
                            true
                        )}
                    </div>
                    <div className="text-black flex justify-center items-center w-full">
                        <img src={coin} className="w-6 mr-1"></img>
                        <p className="text-xl text-pink-500 font-bold">
                            {payload[0].value}
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };
    return (
        <div className="flex justify-start items-center flex-col h-96 w-[600px] ml-2 bg-[#190C34] p-4 rounded-xl mb-8 mt-8 md:w-11/12 md:mt-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] md:ml-0 md:mb-16 order-4 md:order-4">
            <h2 className="text-2xl font-bold text-white">User's Vroomvolts</h2>
            {vroomvoltsData ? (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={vroomvoltsData}>
                        <defs>
                            <linearGradient
                                id="colorVroomvolts"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#FCE700"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#F9890D"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            tick={<CustomXAxisTick />}
                            dataKey="last_updated"
                        />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#FCE700"
                            fillOpacity={1}
                            fill="url(#colorVroomvolts)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <span className="loading "></span>
            )}
        </div>
    );
}
