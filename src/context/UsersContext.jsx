import { createContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { Outlet } from "react-router-dom";

const UsersContext = createContext();

export default UsersContext;

export const UsersProvider = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const api = useAxios();

    const getUsers = async () => {
        try {
            const response = await api.get("/users/");
            if (response.status === 200) {
                setUsers(response.data);
            }
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const contextData = { users };
    return (
        <UsersContext.Provider value={contextData}>
            <Outlet />
        </UsersContext.Provider>
    );
};
