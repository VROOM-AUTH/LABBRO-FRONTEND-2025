import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Countdown from "../components/Countdown";
import useAxios from "../utils/useAxios";
import TopNavigation from "../components/TopNavigation";
import LabStatusCard from "../components/LabStatusCard";
import UserStatusCard from "../components/UserStatusCard";

export default function Home() {
    const api = useAxios();
    const { user, logoutUser } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [labStatus, setLabStatus] = useState({});
    const [totalLabTime, setTotalLabTime] = useState(0);
    const [vroomvolts, setVroomvolts] = useState({});
    const [labSessions, setLabSessions] = useState([]);
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

            {/* <div className="flex flex-col justify-evenly  items-start w-28">
                {users &&
                    users.map((user) => (
                        <div
                            className="flex justify-start items-center h-16"
                            key={user.id}
                        >
                            <img
                                src={user.image}
                                className="w-14 h-14 mr-4 rounded-full"
                            ></img>
                            <p>{user.username}</p>
                        </div>
                    ))}
            </div> */}
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
    );
}
