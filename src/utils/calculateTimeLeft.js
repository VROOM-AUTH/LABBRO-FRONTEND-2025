const calculateTimeLeft = (targetDate) => {
    const difference = new Date(targetDate) - new Date();

    if (difference <= 0)
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

    const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
    return timeLeft;
};

export default calculateTimeLeft;
