import React from "react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import secondsFormat from "../utils/secondsFormat";
import formatDate from "../utils/dateFormat";

export default function LabTimeGraph({ labDurations }) {
    const accumulatedDurations = labDurations.reduce((acc, entry) => {
        const date = entry.from.split("T")[0]; // Get the date part from 'from'

        // If the date does not exist in the accumulator, initialize it
        if (!acc[date]) {
            acc[date] = 0; // Initialize duration to 0
        }

        // Accumulate the duration for the specific date
        acc[date] += entry.duration;

        return acc;
    }, {});

    // Convert the accumulated durations object to an array of objects
    const durationArray = Object.entries(accumulatedDurations).map(
        ([date, totalDuration]) => ({
            date,
            duration: totalDuration,
        })
    );

    const CustomYAxisTick = ({ x, y, payload }) => {
        const string = secondsFormat(payload.value);
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
                    {string}
                </text>
            </g>
        );
    };

    const CustomXAxisTick = ({ x, y, payload }) => {
        // False for hour only, true for date only in graph mode
        const string = formatDate(payload.value, false, true);
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
                    {string}
                </text>
            </g>
        );
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#e3f4f2] w-24 h-12 rounded-xl flex justify-center items-center flex-col">
                    <div className="text-black">
                        {/* False for hour only, true for date only in graph mode */}
                        {formatDate(payload[0].payload.date, false, true)}
                    </div>
                    <div className="text-black">
                        {secondsFormat(payload[0].value)}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex justify-center flex-col items-center w-96 h-96 md:mt-4">
            <div className="text-2xl">Lab time</div>
            {Array.isArray(labDurations) && labDurations.length !== 0 && (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={durationArray}>
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
                        <XAxis
                            tick={<CustomXAxisTick />}
                            dataKey="date"
                            // fill="#e3f4f2"
                            // fontSize="13px"
                            // textAnchor="end"
                        />
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
            )}
        </div>
    );
}
