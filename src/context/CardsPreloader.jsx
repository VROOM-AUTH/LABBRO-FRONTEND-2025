// ImagePreloader.js
import React, { createContext, useContext, useEffect, useState } from "react";
import Card2B from "../assets/Cards/2B.svg";
import Card2S from "../assets/Cards/2S.svg";
import Card2C from "../assets/Cards/2C.svg";
import Card2D from "../assets/Cards/2D.svg";
import Card2H from "../assets/Cards/2H.svg";

import Card3S from "../assets/Cards/3S.svg";
import Card3C from "../assets/Cards/3C.svg";
import Card3D from "../assets/Cards/3D.svg";
import Card3H from "../assets/Cards/3H.svg";

import Card4S from "../assets/Cards/4S.svg";
import Card4C from "../assets/Cards/4C.svg";
import Card4D from "../assets/Cards/4D.svg";
import Card4H from "../assets/Cards/4H.svg";

import Card5S from "../assets/Cards/5S.svg";
import Card5C from "../assets/Cards/5C.svg";
import Card5D from "../assets/Cards/5D.svg";
import Card5H from "../assets/Cards/5H.svg";

import Card6S from "../assets/Cards/6S.svg";
import Card6C from "../assets/Cards/6C.svg";
import Card6D from "../assets/Cards/6D.svg";
import Card6H from "../assets/Cards/6H.svg";

import Card7S from "../assets/Cards/7S.svg";
import Card7C from "../assets/Cards/7C.svg";
import Card7D from "../assets/Cards/7D.svg";
import Card7H from "../assets/Cards/7H.svg";

import Card8S from "../assets/Cards/8S.svg";
import Card8C from "../assets/Cards/8C.svg";
import Card8D from "../assets/Cards/8D.svg";
import Card8H from "../assets/Cards/8H.svg";

import Card9S from "../assets/Cards/9S.svg";
import Card9C from "../assets/Cards/9C.svg";
import Card9D from "../assets/Cards/9D.svg";
import Card9H from "../assets/Cards/9H.svg";

import CardTS from "../assets/Cards/TS.svg";
import CardTC from "../assets/Cards/TC.svg";
import CardTD from "../assets/Cards/TD.svg";
import CardTH from "../assets/Cards/TH.svg";

import CardJS from "../assets/Cards/JS.svg";
import CardJC from "../assets/Cards/JC.svg";
import CardJD from "../assets/Cards/JD.svg";
import CardJH from "../assets/Cards/JH.svg";

import CardQS from "../assets/Cards/QS.svg";
import CardQC from "../assets/Cards/QC.svg";
import CardQD from "../assets/Cards/QD.svg";
import CardQH from "../assets/Cards/QH.svg";

import CardKS from "../assets/Cards/KS.svg";
import CardKC from "../assets/Cards/KC.svg";
import CardKD from "../assets/Cards/KD.svg";
import CardKH from "../assets/Cards/KH.svg";

import CardAS from "../assets/Cards/AS.svg";
import CardAC from "../assets/Cards/AC.svg";
import CardAD from "../assets/Cards/AD.svg";
import CardAH from "../assets/Cards/AH.svg";

const CardImagesContext = createContext();

const cardImages = {
    "2B": Card2B,
    "2S": Card2S,
    "2C": Card2C,
    "2D": Card2D,
    "2H": Card2H,
    "3S": Card3S,
    "3C": Card3C,
    "3D": Card3D,
    "3H": Card3H,
    "4S": Card4S,
    "4C": Card4C,
    "4D": Card4D,
    "4H": Card4H,
    "5S": Card5S,
    "5C": Card5C,
    "5D": Card5D,
    "5H": Card5H,
    "6S": Card6S,
    "6C": Card6C,
    "6D": Card6D,
    "6H": Card6H,
    "7S": Card7S,
    "7C": Card7C,
    "7D": Card7D,
    "7H": Card7H,
    "8S": Card8S,
    "8C": Card8C,
    "8D": Card8D,
    "8H": Card8H,
    "9S": Card9S,
    "9C": Card9C,
    "9D": Card9D,
    "9H": Card9H,
    "TS": CardTS,
    "TC": CardTC,
    "TD": CardTD,
    "TH": CardTH,
    "JS": CardJS,
    "JC": CardJC,
    "JD": CardJD,
    "JH": CardJH,
    "QS": CardQS,
    "QC": CardQC,
    "QD": CardQD,
    "QH": CardQH,
    "KS": CardKS,
    "KC": CardKC,
    "KD": CardKD,
    "KH": CardKH,
    "AS": CardAS,
    "AC": CardAC,
    "AD": CardAD,
    "AH": CardAH,

};

const preloadImages = (images) => {
    const promises = Object.values(images).map((src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve; // Resolve when the image is loaded
        });
    });
    return Promise.all(promises); // Return a promise that resolves when all images are loaded
};

export const CardImagesProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        preloadImages(cardImages).then(() => {
            setLoading(false); // Set loading to false when all images are preloaded
        });
    }, []);

    return (
        <CardImagesContext.Provider value={{ loading, cardImages }}>
            {children}
        </CardImagesContext.Provider>
    );
};

export const useCardImages = () => {
    return useContext(CardImagesContext);
};
