import React from "react";
import { useCardImages } from "../context/CardsPreloader";

export default function PlayingCard({ card }) {
    const { loading, cardImages } = useCardImages();
    const cardClass = "w-24 h-36 m-1 md:w-16 md:h-24";

    if (loading) {
        return <p className="loading loading-dots loading-sm"></p>; // Display a loading message while images are loading
    }

    const imageSrc = cardImages[card];

    return imageSrc ? (
        <img src={imageSrc} className={cardClass} alt={card} />
    ) : (
        <></>
    );
}
