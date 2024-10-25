import React, { useEffect, useState, useContext } from "react";
import TopNavigation from "../components/TopNavigation";
import LuckyWheel from "../components/LuckyWheel";
import BlackJack from "../components/BlackJack";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import coin from "../assets/coin.png";
import AnimatedNumber from "../components/AnimatedNumber";
import { CardImagesProvider } from "../context/CardsPreloader";
import Rouleta from "../components/Rouleta";
export default function Vroomvolts() {
    const { user } = useContext(AuthContext);
    const api = useAxios();
    const [vroomvolts, setVroomvolts] = useState(0);

    useEffect(() => {
        api.get("/vroomvolts/latest/").then((response) => {
            if (response.data) {
                const myVroomvolts = response.data?.find(
                    (entry) => entry.user === user.user_id
                ).value;

                setVroomvolts(myVroomvolts);
            }
        });
    }, []);

    return (
        <div className="flex justify-evenly items-center w-full h-screen relative md:flex-col md:justify-center md:h-fit">
            <TopNavigation />

            <div className="mt-8 absolute top-8 left-12 h-14  flex justify-start items-center bg-[#351748] py-2 px-3 rounded-3xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] md:top-2 md:mt-0 md:left-2 md:fixed z-10">
                <img src={coin} className="w-10 mr-4"></img>
                <h1 className="text-4xl m-0 p-0 text-center">
                    <AnimatedNumber n={vroomvolts} />
                </h1>
            </div>
            <LuckyWheel vroomvolts={vroomvolts} setVroomvolts={setVroomvolts} />
            <CardImagesProvider>
                <BlackJack
                    vroomvolts={vroomvolts}
                    setVroomvolts={setVroomvolts}
                />
            </CardImagesProvider>
            <Rouleta vroomvolts={vroomvolts} setVroomvolts={setVroomvolts} />
        </div>
    );
}
