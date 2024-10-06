import React, { useState } from "react";
import { ContributionCalendar, createTheme } from "react-contribution-calendar";
import secondsFormat from "../utils/secondsFormat";
import InfoModal from "./InfoModal";
export default function AttendanceCalendar({ data }) {
    const [details, setDetails] = useState(null);
    const customTheme = createTheme({
        level0: "#10002B",
        level1: "#392e57",
        level2: "#685b88",
        level3: "#9b8cbc",
        level4: "#d0c0f3",
    });

    return (
        <div className="flex justify-start items-center flex-col w-3/5 bg-[#190C34] p-4 rounded-xl mb-8 md:w-11/12 md:mt-4 md:mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
                Attendance Calendar
            </h2>
            {!details && (
                <div className="text-lg text-white mb-4">
                    Click on a square for details!
                </div>
            )}
            {details && (
                <div className="text-lg text-white mb-4">
                    <span className="text-pink-500">
                        {secondsFormat(details.duration)}
                    </span>
                    {" on "}
                    <span className="text-pink-500">{details.date}</span>
                </div>
            )}
            <ContributionCalendar
                data={data}
                start="2024-09-01"
                end="2025-12-01"
                daysOfTheWeek={[
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                ]}
                textColor="#fff"
                startsOnSunday={false}
                includeBoundary={true}
                theme={customTheme}
                cx={15}
                cy={15}
                cr={3}
                // Set the details as the total duration of the day
                onCellClick={(e, data) =>
                    setDetails({
                        duration: data.data.duration,
                        date: data.date,
                    })
                }
                scroll={true}
                style={{
                    padding: 0,
                    width: "100%",
                    overflow: "hidden",
                }}
            />
            <h2
                className="text-sm mt-4 text-[#D0C0F3] cursor-pointer"
                onClick={() =>
                    document.getElementById("attendanceCalendar").showModal()
                }
            >
                How is this calculated?
            </h2>
            <InfoModal
                id={"attendanceCalendar"}
                title={"How is this calculated?"}
                content={
                    "The levels are calculated based on the duration of a lab session. The levels are: Not present that day, less than 1h, less than 2h, less than 4h and more than 4h!"
                }
            />
        </div>
    );
}
