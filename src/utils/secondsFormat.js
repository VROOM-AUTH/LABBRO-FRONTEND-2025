function secondsFormat(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const timeParts = [];

    if (hours > 0) {
        timeParts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    }
    if (minutes > 0) {
        timeParts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    }
    if (remainingSeconds > 0) {
        timeParts.push(
            `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`
        );
    }

    return timeParts.join(" and ");
}

export default secondsFormat;
