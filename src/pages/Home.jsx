import React, { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import TopNavigation from "../components/TopNavigation";
import LabStatusCard from "../components/LabStatusCard";
import UserStatusCard from "../components/UserStatusCard";
import UserBarChart from "../components/UserBarChart";
import UserList from "../components/UserList";
import RecentActivity from "../components/RecentActivity";
import LabTimeGraph from "../components/LabTimeGraph";
import VroomvoltGamesCard from "../components/VroomvoltGamesCard";
import SmartLabCard from "../components/SmartLabCard";
import LinksToPlatformsCard from "../components/LinksToPlatformsCard";
import RecentVroomvolts from "../components/RecentVroomvolts";

export default function Home() {
    const api = useAxios();
    const [users, setUsers] = useState([]);
    const [labStatus, setLabStatus] = useState({});
    const [vroomvolts, setVroomvolts] = useState({});
    const [labSessions, setLabSessions] = useState([]);
    const [labDurations, setLabDurations] = useState([]);

    // Keep only the username and total_time fields and sort in descending order
    const graphData = users
        ?.map(({ username, total_time }) => ({
            username,
            total_time,
        }))
        .sort((a, b) => b.total_time - a.total_time);
    useEffect(() => {
        api.get("/users").then((response) => {
            if (response.data) {
                setUsers(response.data);
            }
        });
        api.get("/labstatus/latest/").then((response) => {
            if (response.data) {
                setLabStatus(response.data);
            }
        });
        api.get("/labstatus/durations/").then((response) => {
            if (response.data) {
                setLabDurations(response.data);
            }
        });

        api.get("/vroomvolts/latest/").then((response) => {
            if (response.data) {
                setVroomvolts(response.data);
            }
        });
        api.get("/labsessions/").then((response) => {
            if (response.data) {
                setLabSessions(response.data);
            }
        });
    }, []);

    return (
        <div className="flex flex-col pt-8 justify-center items-center w-full h-full md:flex-col md:justify-center">
            <TopNavigation />
            <div className="flex w-11/12 justify-center items-center md:flex-col ">
                <div className="flex w-fit flex-col h-fit justify-center items-center">
                    <div className="flex w-fit justify-between items-center md:flex-col">
                        <UserStatusCard
                            users={users}
                            vroomvolts={vroomvolts}
                            labSessions={labSessions}
                            labStatus={labStatus}
                        />
                        <LabStatusCard users={users} />
                    </div>
                    <LinksToPlatformsCard />
                </div>
                <UserBarChart data={graphData} />
            </div>
            <div className="flex w-11/12 justify-center items-center mt-4 md:flex-col md:m-0">
                {/* <VroomvoltGamesCard /> */}
                <UserList users={users} />
                <LabTimeGraph labDurations={labDurations} />
                <div className="flex md:w-full md:h-full justify-start items-center md:mb-16">
                    <RecentActivity users={users} />
                    <RecentVroomvolts users={users} />
                </div>
            </div>
            {/* <SmartLabCard /> */}
        </div>
    );
}
