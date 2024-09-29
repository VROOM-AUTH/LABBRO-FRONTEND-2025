import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
export default function TopNavigation() {
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState("Home");
    const { logoutUser } = useContext(AuthContext);

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setActive("Home");
                break;
            case "/vroomvolts":
                setActive("Vroomvolts");
                break;
            case "/users":
                setActive("Users");
                break;
            case "/smartlab":
                setActive("SmartLab");
                break;
            case "/marathon":
                setActive("Marathon");
                break;
            case "/profile":
                setActive("Profile");
                break;
            default:
                setActive("Home");
        }
    }, [location.pathname]);

    // Function to determine the class name based on active state
    const getClassName = (item) => {
        return active === item
            ? "text-white hover:text-purple-300 cursor-pointer text-xl font-bold text-purple-600"
            : "text-white hover:text-purple-300 cursor-pointer text-xl";
    };

    return (
        <div className="w-2/5 h-12 bg-slate-800  rounded-3xl flex justify-evenly items-center">
            <h1 className={getClassName("Home")} onClick={() => navigate("/")}>
                Home
            </h1>
            <h1
                className={getClassName("Vroomvolts")}
                onClick={() => navigate("/vroomvolts")}
            >
                Vroomvolts
            </h1>
            <h1
                className={getClassName("Users")}
                onClick={() => navigate("/users")}
            >
                Users
            </h1>
            <h1
                className={getClassName("SmartLab")}
                onClick={() => navigate("/smartlab")}
            >
                SmartLab
            </h1>
            <h1
                className={getClassName("Marathon")}
                onClick={() => navigate("/marathon")}
            >
                Marathon
            </h1>
            <h1
                className={getClassName("Profile")}
                onClick={() => navigate("/profile")}
            >
                Profile
            </h1>
            <h1
                className="text-white hover:text-purple-300 cursor-pointer text-xl"
                onClick={logoutUser}
            >
                Logout
            </h1>
        </div>
    );
}
