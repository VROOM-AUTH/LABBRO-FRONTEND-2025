import React from "react";
import {
    Area,
    AreaChart,
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
    return (
        <div className="flex justify-center flex-col items-center w-96 md:mt-4 rounded-2xl h-96 bg-[#190C34] ml-2 md:ml-0 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
            <div className="text-2xl py-1 bg-[#473663] rounded-t-2xl w-full text-center">
                Lab time
            </div>
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
