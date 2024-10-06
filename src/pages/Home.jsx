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

export default function Home() {
    const api = useAxios();
    const [users, setUsers] = useState([]);
    const [labStatus, setLabStatus] = useState({});
    const [totalLabTime, setTotalLabTime] = useState(0);
    const [vroomvolts, setVroomvolts] = useState({});
    const [labSessions, setLabSessions] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
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
        api.get("/labstatus/durations/total").then((response) => {
            if (response.data) {
                setTotalLabTime(response.data.total_duration);
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
        api.get("/labsessions/recent/").then((response) => {
            if (response.data) {
                setRecentActivity(response.data);
            }
        });
    }, []);

    return (
        <div className="flex justify-evenly items-center w-full h-full md:flex-col md:justify-center">
            <TopNavigation />
            <div className="flex flex-col  md:justify-center md:items-center md:w-full w-2/6 ">
                <div className="flex justify-between items-start md:flex-col md:w-11/12 md:justify-center md:items-center">
                    <UserStatusCard
                        users={users}
                        vroomvolts={vroomvolts}
                        labSessions={labSessions}
                        labStatus={labStatus}
                    />
                    <LabStatusCard
                        users={users}
                        labStatus={labStatus}
                        totalLabTime={totalLabTime}
                    />
                </div>
                <VroomvoltGamesCard />
                <SmartLabCard />
            </div>
            <div className="flex flex-col justify-between h-5/6 items-center w-2/5 md:w-full">
                <div className="flex justify-center items-center h-96 w-full md:w-11/12 md:mt-4">
                    <UserBarChart data={graphData} />
                </div>
                <div className="flex justify-between items-center w-full md:flex-col md:justify-center md:w-11/12">
                    <UserList users={users} />
                    <LabTimeGraph labDurations={labDurations} />
                </div>
            </div>
            <RecentActivity users={users} recentActivity={recentActivity} />
        </div>
    );
}
