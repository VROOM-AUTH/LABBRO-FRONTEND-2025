function formatDate(isoString) {
    const date = new Date(isoString);

    // Get the date in the Greek timezone (Europe/Athens)
    const options = {
        timeZone: "Europe/Athens",
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24-hour format
    };

    // Format the date string using locale and options
    const formatted = date.toLocaleString("en-GB", options);

    // Split the formatted string to get the desired output
    const [day, month, , time] = formatted.split(/[/, ]/);

    return `${day}/${month} ${time}`;
}

export default formatDate;
