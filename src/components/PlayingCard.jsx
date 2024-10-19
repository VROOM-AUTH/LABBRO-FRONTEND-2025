import React from "react";
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

export default function PlayingCard({ card }) {
    const cardClass = "w-24 h-36 m-1";
    switch (card) {
        case "2B":
            return <img src={Card2B} className={cardClass} alt="2B" />;
        case "2S":
            return <img src={Card2S} className={cardClass} alt="2S" />;
        case "2C":
            return <img src={Card2C} className={cardClass} alt="2C" />;
        case "2D":
            return <img src={Card2D} className={cardClass} alt="2D" />;
        case "2H":
            return <img src={Card2H} className={cardClass} alt="2H" />;
        case "3S":
            return <img src={Card3S} className={cardClass} alt="3S" />;
        case "3C":
            return <img src={Card3C} className={cardClass} alt="3C" />;
        case "3D":
            return <img src={Card3D} className={cardClass} alt="3D" />;
        case "3H":
            return <img src={Card3H} className={cardClass} alt="3H" />;
        case "4S":
            return <img src={Card4S} className={cardClass} alt="4S" />;
        case "4C":
            return <img src={Card4C} className={cardClass} alt="4C" />;
        case "4D":
            return <img src={Card4D} className={cardClass} alt="4D" />;
        case "4H":
            return <img src={Card4H} className={cardClass} alt="4H" />;
        case "5S":
            return <img src={Card5S} className={cardClass} alt="5S" />;
        case "5C":
            return <img src={Card5C} className={cardClass} alt="5C" />;
        case "5D":
            return <img src={Card5D} className={cardClass} alt="5D" />;
        case "5H":
            return <img src={Card5H} className={cardClass} alt="5H" />;
        case "6S":
            return <img src={Card6S} className={cardClass} alt="6S" />;
        case "6C":
            return <img src={Card6C} className={cardClass} alt="6C" />;
        case "6D":
            return <img src={Card6D} className={cardClass} alt="6D" />;
        case "6H":
            return <img src={Card6H} className={cardClass} alt="6H" />;
        case "7S":
            return <img src={Card7S} className={cardClass} alt="7S" />;
        case "7C":
            return <img src={Card7C} className={cardClass} alt="7C" />;
        case "7D":
            return <img src={Card7D} className={cardClass} alt="7D" />;
        case "7H":
            return <img src={Card7H} className={cardClass} alt="7H" />;
        case "8S":
            return <img src={Card8S} className={cardClass} alt="8S" />;
        case "8C":
            return <img src={Card8C} className={cardClass} alt="8C" />;
        case "8D":
            return <img src={Card8D} className={cardClass} alt="8D" />;
        case "8H":
            return <img src={Card8H} className={cardClass} alt="8H" />;
        case "9S":
            return <img src={Card9S} className={cardClass} alt="9S" />;
        case "9C":
            return <img src={Card9C} className={cardClass} alt="9C" />;
        case "9D":
            return <img src={Card9D} className={cardClass} alt="9D" />;
        case "9H":
            return <img src={Card9H} className={cardClass} alt="9H" />;
        case "TS":
            return <img src={CardTS} className={cardClass} alt="TS" />;
        case "TC":
            return <img src={CardTC} className={cardClass} alt="TC" />;
        case "TD":
            return <img src={CardTD} className={cardClass} alt="TD" />;
        case "TH":
            return <img src={CardTH} className={cardClass} alt="TH" />;
        case "JS":
            return <img src={CardJS} className={cardClass} alt="JS" />;
        case "JC":
            return <img src={CardJC} className={cardClass} alt="JC" />;
        case "JD":
            return <img src={CardJD} className={cardClass} alt="JD" />;
        case "JH":
            return <img src={CardJH} className={cardClass} alt="JH" />;
        case "QS":
            return <img src={CardQS} className={cardClass} alt="QS" />;
        case "QC":
            return <img src={CardQC} className={cardClass} alt="QC" />;
        case "QD":
            return <img src={CardQD} className={cardClass} alt="QD" />;
        case "QH":
            return <img src={CardQH} className={cardClass} alt="QH" />;
        case "KS":
            return <img src={CardKS} className={cardClass} alt="KS" />;
        case "KC":
            return <img src={CardKC} className={cardClass} alt="KC" />;
        case "KD":
            return <img src={CardKD} className={cardClass} alt="KD" />;
        case "KH":
            return <img src={CardKH} className={cardClass} alt="KH" />;
        case "AS":
            return <img src={CardAS} className={cardClass} alt="AS" />;
        case "AC":
            return <img src={CardAC} className={cardClass} alt="AC" />;
        case "AD":
            return <img src={CardAD} className={cardClass} alt="AD" />;
        case "AH":
            return <img src={CardAH} className={cardClass} alt="AH" />;
        default:
            return <></>;
    }
}
