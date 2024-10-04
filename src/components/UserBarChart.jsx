import React from "react";
import secondsFormat from "../utils/secondsFormat";
import {
    Bar,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    BarChart,
} from "recharts";

export default function UserBarChart({ data }) {
    //custom y axis to show hours and minutes instead of seconds
    const CustomYAxisTick = ({ x, y, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    fill="#e3f4f2"
                    fontSize="13px"
                    textAnchor="end"
                >
                    {secondsFormat(payload.value)}
                </text>
            </g>
        );
    };

    //custom tooltip to show hours and minutes instead of seconds
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#e3f4f2] w-24 h-12 rounded-xl flex justify-center items-center flex-col">
                    <div className="text-black">
                        {payload[0].payload.username}
                    </div>
                    <div className="text-black">
                        {secondsFormat(payload[0].value)}
                    </div>
                </div>
            );
        }

        return null;
    };

    //custom legend to show total hours
    const customLegend = () => {
        return (
            <div className="mt-3 ml-1 flex justify-start items-center">
                <div className="bg-gradient-to-r from-[#e971e3] to-[#9480fa] w-4 h-4 mr-2"></div>
                <div>Total Hours</div>
            </div>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <div className="text-2xl text-center">User's time</div>
            <BarChart data={data}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9480FA" stopOpacity={1} />
                        <stop
                            offset="95%"
                            stopColor="#E971E3"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>

                <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    opacity={0.4}
                />
                <XAxis
                    dataKey="username"
                    interval={0}
                    tick={{
                        fill: "#e3f4f2",
                        fontSize: "13px",
                        fontWeight: "300",
                        dy: 15,
                    }}
                    angle={-45}
                />
                <YAxis tick={<CustomYAxisTick />} />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={customLegend} />
                <Bar dataKey="total_time" fill={"url(#color)"} radius={5} />
            </BarChart>
        </ResponsiveContainer>
    );
}
