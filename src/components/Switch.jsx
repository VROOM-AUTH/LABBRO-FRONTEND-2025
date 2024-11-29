import React from "react";

const SwitchComponent = ({
  options,
  selectedOption,
  setSelectedOption,
  size,
}) => {
  // Tailwind classes for sizes
  // Default size is small
  const sizeClasses = {
    small: {
      container: "w-44 h-8 md:w-16 md:h-16",
      text: "text-xs md:text-[9px]",
    },
    medium: {
      container: "w-52 h-10 md:w-20 md:h-24",
      text: "text-sm md:text-xs",
    },
    large: {
      container: "w-60 h-12 md:w-24 md:h-28",
      text: "text-base md:text-sm",
    },
  };
  const isSizeValid = size in sizeClasses;
  const currentSize = isSizeValid ? sizeClasses[size] : sizeClasses["small"];

  return (
    <div className="relative inline-flex shadow-[4px_8px_8px_rgba(0,0,0,0.38)] rounded-xl">
      <div
        className={`${currentSize.container} bg-purple-500 rounded-xl relative flex flex-row md:flex-col`}
      >
        {options.map((option, index) => (
          <span
            key={index}
            className={`flex-1 flex items-center justify-center text-center z-10 ${
              currentSize.text
            } ${
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
          className={`absolute left-0 top-0 w-1/2 h-full md:w-full md:h-1/2 bg-purple-700 rounded-xl transform transition-transform duration-300 ${
            selectedOption === options[1].value
              ? "translate-x-full md:translate-x-0 md:translate-y-full"
              : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

export default SwitchComponent;
