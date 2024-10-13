import React from "react";
import formatDataForActivity from "../utils/formatDataForActivity";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    CustomXAxisTick,
    CustomYAxisTick,
    CustomTooltip,
} from "./CustomChartElements";

export default function UserTimeGraph({ data }) {
    const newData = formatDataForActivity(data, true);
    return (
        <div className="flex justify-start items-center flex-col h-96 w-[600px] ml-2 bg-[#190C34] p-4 rounded-xl mb-8 mt-8 md:w-11/12 md:mt-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] md:mb-0 order-3 md:order-3 md:ml-0">
            <h2 className="text-2xl font-bold text-white">User's Time</h2>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={newData}>
                    <defs>
                        <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#8884d8"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#cc84d8"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis tick={<CustomXAxisTick />} dataKey="start" />
                    <YAxis tick={<CustomYAxisTick />} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="duration"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
