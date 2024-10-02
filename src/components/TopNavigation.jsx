import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
export default function TopNavigation() {
    const location = useLocation();
    const navigate = useNavigate();

    // Function to determine the initial active state based on location.pathname
    const getInitialActiveState = (pathname) => {
        switch (pathname) {
            case "/vroomvolts":
                return "Vroomvolts";
            case "/users":
                return "Users";
            case "/smartlab":
                return "SmartLab";
            case "/marathon":
                return "Marathon";
            case "/profile":
                return "Profile";
            case "/admin":
                return "Admin";
            default:
                return "Home";
        }
    };
    const [active, setActive] = useState(
        getInitialActiveState(location.pathname)
    );
    const { user } = useContext(AuthContext);

    // Update active state based on location.pathname on first render
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
            case "/admin":
                setActive("Admin");
                break;
            default:
                setActive("Home");
        }
    }, [location.pathname]);
    // Function to determine the class name based on active state
    const getClassName = (item) => {
        return active === item
            ? "hover:drop-shadow-xl  text-pink-400 text-3xl font-bold cursor-pointer h-full w-20 flex justify-center items-center px-3 transition-all"
            : "text-white hover:drop-shadow-xl hover:text-3xl  hover:drop-shadow-[0_5px_15px_rgba(237,201,21,0.75)] font-bold cursor-pointer text-xl h-full w-20 flex justify-center items-center px-3 transition-all ";
    };
    return (
        <div className="w-7/12 h-14 mt-4]  rounded-xl flex justify-evenly items-center absolute top-1 border-b-2 border-[rgba(237,201,21)]">
            <h1
                className={getClassName("Home") + " rounded-l-xl"}
                onClick={() => navigate("/")}
            >
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
            {user.is_staff && (
                <h1
                    className={getClassName("Admin")}
                    onClick={() => navigate("/admin")}
                >
                    Admin
                </h1>
            )}

            <h1
                className={getClassName("Profile")}
                onClick={() => navigate("/profile")}
            >
                Profile
            </h1>
        </div>
    );
}
