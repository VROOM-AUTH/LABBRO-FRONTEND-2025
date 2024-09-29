import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
export default function TopNavigation() {
    const location = useLocation();
    const navigate = useNavigate();
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
            ? "text-white hover:text-purple-300 cursor-pointer text-xl text-[#fff] bg-[#560bad] h-full flex justify-center items-center px-3 transition-all"
            : "text-white hover:text-purple-300 cursor-pointer text-xl h-full flex justify-center items-center px-3 transition-all ";
    };

    return (
        <div className="w-fit h-10 mt-4 bg-[#7b2cbf]  rounded-xl flex justify-evenly items-center">
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
                className={getClassName("Profile") + " rounded-r-xl"}
                onClick={() => navigate("/profile")}
            >
                Profile
            </h1>
            {/* <h1
                className="text-white hover:text-purple-300 cursor-pointer text-xl h-full flex justify-center items-center px-3 transition-all border-l "
                onClick={logoutUser}
            >
                Logout
            </h1> */}
        </div>
    );
}
