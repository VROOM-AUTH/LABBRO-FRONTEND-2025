import formatDate from "../utils/dateFormat";
import secondsFormat from "../utils/secondsFormat";

const CustomYAxisTick = ({ x, y, payload }) => {
    const string = secondsFormat(payload.value);
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                fill="#e3f4f2"
                fontSize="13px"
                textAnchor="end"
            >
                {string}
            </text>
        </g>
    );
};

const CustomXAxisTick = ({ x, y, payload }) => {
    // False for hour only, true for date only in graph mode
    const string = formatDate(payload.value, false, true);
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                fill="#e3f4f2"
                fontSize="13px"
                textAnchor="end"
            >
                {string}
            </text>
        </g>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#e3f4f2] w-24 h-12 rounded-xl flex justify-center items-center flex-col">
                <div className="text-black">
                    {/* False for hour only, true for date only in graph mode */}
                    {formatDate(payload[0].payload.date, false, true)}
                </div>
                <div className="text-black">
                    {secondsFormat(payload[0].value)}
                </div>
            </div>
        );
    }
    return null;
};

export { CustomYAxisTick, CustomXAxisTick, CustomTooltip };
