import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";

export default function AnimatedNumber({ n }) {
    const [prevNumber, setPrevNumber] = useState(n); // State to track previous number
    const [color, setColor] = useState("#text-purple-500"); // State to track color class

    const { number } = useSpring({
        from: { number: prevNumber }, // Use the previous number for the initial animation
        number: n,
        delay: 200,
        config: {
            duration: 1500,
            mass: 2,
            tension: 150,
            friction: 10,
        },
        onRest: () => {
            // Reset color after animation is done
            setColor("text-[#FDAE06]");
        },
    });

    // Effect to update color and previous number
    useEffect(() => {
        if (n > prevNumber) {
            setColor("text-green-500"); // Rising
        } else if (n < prevNumber) {
            setColor("text-red-500"); // Falling
        }
        setPrevNumber(n); // Update previous number
    }, [n]); // Run effect when n changes

    return (
        <animated.div className={color}>
            {number.to((n) => n.toFixed(0))}
        </animated.div>
    );
}
