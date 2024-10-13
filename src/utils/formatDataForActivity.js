const levels = (duration) => {
    if (duration > 0 && duration <= 3600) {
        return 1;
    } else if (duration <= 7200) {
        return 2;
    } else if (duration <= 14400) {
        return 3;
    } else {
        return 4;
    }
};

export default function formatDataForActivity(data, forUser = false) {
    let startTime = null;
    const sessionDurations = [];

    data?.forEach((entry) => {
        if (entry.status === true) {
            startTime = new Date(entry.timestamp);
        } else if (entry.status === false && startTime) {
            const endTime = new Date(entry.timestamp);
            const duration = (endTime - startTime) / 1000; // Duration in seconds

            // Get the date part from the start time (YYYY-MM-DD format)
            const dateKey = startTime.toISOString().split("T")[0];

            // Check if the date already exists in the array
            const existingEntry = sessionDurations.find(
                (e) => e.date === dateKey
            );

            if (existingEntry) {
                existingEntry.duration += duration; // Add to the existing duration
            } else {
                sessionDurations.push({
                    date: dateKey,
                    start: startTime.toISOString(),
                    end: endTime.toISOString(),
                    duration: duration,
                });
            }

            startTime = null; // Reset for the next session
        }
    });
    if (forUser) {
        return sessionDurations;
    }

    const transformedData = sessionDurations.map((entry) => ({
        [entry.date]: {
            level: levels(entry.duration),
            data: {
                duration: entry.duration,
            },
        },
    }));

    return transformedData;
}
