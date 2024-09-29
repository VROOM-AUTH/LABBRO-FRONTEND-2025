import React, { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import TopNavigation from "../components/TopNavigation";
import LabStatusCard from "../components/LabStatusCard";
import UserStatusCard from "../components/UserStatusCard";
import UserBarChart from "../components/UserBarChart";
import UserList from "../components/UserList";

export default function Home() {
    const api = useAxios();
    const [users, setUsers] = useState([]);
    const [labStatus, setLabStatus] = useState({});
    const [totalLabTime, setTotalLabTime] = useState(0);
    const [vroomvolts, setVroomvolts] = useState({});
    const [labSessions, setLabSessions] = useState([]);

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
    }, []);
    return (
        <div className="flex justify-center items-center flex-col w-full h-full">
            <TopNavigation />
            <div className="flex justify-evenly items-start w-3/4 ">
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
                <UserList users={users} />
            </div>
            <div className="flex justify-center items-center w-1/3 h-96 ">
                <UserBarChart data={graphData} />
            </div>
        </div>
    );
}
