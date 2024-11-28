import React from "react";

const SwitchComponent = ({
  options,
  selectedOption,
  setSelectedOption,
  size,
}) => {
  // Tailwind classes for sizes
  //default size is small
  const sizeClasses = {
    small: {
      container: "w-44 h-8",
      text: "text-xs",
    },
    medium: {
      container: "w-52 h-10",
      text: "text-sm",
    },
    large: {
      container: "w-60 h-12",
      text: "text-base",
    },
  };
  const isSizeValid = size in sizeClasses;
  const currentSize = isSizeValid ? sizeClasses[size] : sizeClasses["small"];

  return (
    <div className="relative inline-flex items-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-xl">
      <div
        className={`${currentSize.container} bg-purple-500 rounded-xl relative flex items-center`}
      >
        {options.map((option, index) => (
          <span
            key={index}
            className={`w-1/2 text-center z-10 ${currentSize.text} ${
              selectedOption === option.value
                ? "text-white font-bold"
                : "text-gray-300 cursor-pointer"
            }`}
            onClick={() => {
              if (selectedOption !== option.value) {
                setSelectedOption(option.value);
              }
            }}
          >
            {option.label}
          </span>
        ))}
        {/* Switch thumb */}
        <div
          className={`absolute left-0 top-0 w-1/2 h-full bg-purple-700 rounded-xl transform transition-transform duration-300 ${
            selectedOption === options[1].value ? "translate-x-full" : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

export default SwitchComponent;
