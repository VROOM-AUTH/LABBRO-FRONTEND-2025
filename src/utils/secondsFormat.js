function secondsFormat(seconds) {
    const roundedSeconds = Math.round(seconds); // Round the total seconds
    const hours = Math.floor(roundedSeconds / 3600);
    const minutes = Math.floor((roundedSeconds % 3600) / 60);
    const remainingSeconds = roundedSeconds % 60;

    // Format as hh:mm:ss
    const hoursStr = `${hours.toString().padStart(2, "0")}h`;
    const minutesStr = `${minutes.toString().padStart(2, "0")}m`;
    // const secondsStr = `${remainingSeconds.toString().padStart(2, "0")}s`;

    return `${hoursStr} ${minutesStr}`;
}

export default secondsFormat;
