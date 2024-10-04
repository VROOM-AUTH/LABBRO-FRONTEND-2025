import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { IoMdHome } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { LuSmartphoneNfc } from "react-icons/lu";
import { IoIosPodium } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";

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
            case `/profile/${user.user_id}`:
                setActive("Profile");
                break;
            case "/admin":
                setActive("Admin");
                break;
            default:
                setActive("None");
        }
    }, [location.pathname]);
    // Function to determine the class name based on active state
    const getClassName = (item) => {
        return active === item
            ? "hover:drop-shadow-xl  text-pink-400 text-3xl font-bold cursor-pointer h-full w-20 flex justify-center items-center px-3 transition-all"
            : "text-white hover:drop-shadow-xl hover:text-3xl  hover:drop-shadow-[0_5px_15px_rgba(237,201,21,0.75)] font-bold cursor-pointer text-xl h-full w-20 flex justify-center items-center px-3 transition-all ";
    };

    const getClassNameMobile = (item) => {
        return active === item
            ? "text-pink-400 w-10 h-10"
            : "text-white w-10 h-10";
    };
    return (
        <>
            {/* NAVIGATION FOR PC */}
            <div className="w-7/12 h-14  rounded-xl flex justify-evenly items-center absolute top-1 border-b-2 border-[rgba(237,201,21)] md:hidden z-10">
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
                    onClick={() => navigate(`/profile/${user.user_id}`)}
                >
                    Profile
                </h1>
            </div>
            {/* NAVIGATION FOR MOBILE*/}
            <div className="md:w-full hidden md:flex md:bg-[#32134B] md:justify-evenly md:items-center md:fixed md:bottom-0 z-10 md:h-14">
                <IoMdHome
                    className={getClassNameMobile("Home") + " rounded-l-xl"}
                    onClick={() => navigate("/")}
                ></IoMdHome>
                <FaCoins
                    className={getClassNameMobile("Vroomvolts")}
                    onClick={() => navigate("/vroomvolts")}
                ></FaCoins>
                <HiMiniUsers
                    className={getClassNameMobile("Users")}
                    onClick={() => navigate("/users")}
                ></HiMiniUsers>
                <LuSmartphoneNfc
                    className={getClassNameMobile("SmartLab")}
                    onClick={() => navigate("/smartlab")}
                ></LuSmartphoneNfc>
                <IoIosPodium
                    className={getClassNameMobile("Marathon")}
                    onClick={() => navigate("/marathon")}
                ></IoIosPodium>
                {user.is_staff && (
                    <MdAdminPanelSettings
                        className={getClassNameMobile("Admin")}
                        onClick={() => navigate("/admin")}
                    ></MdAdminPanelSettings>
                )}

                <FaUser
                    className={getClassNameMobile("Profile")}
                    onClick={() => navigate("/profile")}
                ></FaUser>
            </div>
        </>
    );
}
