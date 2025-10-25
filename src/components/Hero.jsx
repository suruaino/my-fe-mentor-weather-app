import React from "react";
import { FaSearch } from "react-icons/fa";

const Hero = ({
  handleSearchInput,
  handleSearchSubmit,
  searchParam,
  isLoading,
  locationOptions,
  handleOptionClick,
  showOptions,
}) => {
  return (
    <div className="hero text-center flex flex-col items-center gap-10 relative w-full ">
      <h1 className="font-bricolage max-w-[87%] sm:max-w-[80%] text-[3.25rem] sm:text-[3.5rem] leading-tight">How's the sky looking today?</h1>
      <form
        onSubmit={handleSearchSubmit}
        className="w-[90%] md:max-w-[55%] flex items-center"
      >
        <div className="w-full max-w-[60rem] flex gap-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent)]"/>
        <input
          type="text"
          placeholder="Search for a location"
          value={searchParam}
          onChange={handleSearchInput}
          className="w-full py-2 px-3 pl-12 rounded-l-lg bg-[var(--bg2)] border border-[var(--bg3)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <button type="submit" className="bg-[var(--blue)] py-2 px-4 rounded-r-lg border border-transparent active:border active:border-[var(--accent)]">
          {isLoading ? "searching..." : "search"}
        </button>
        {showOptions && locationOptions.length > 0 && (
        <ul className="text-left absolute top-full left-0 right-0 p-2 mt-2 bg-[var(--bg2)] border border-[var(--bg3)] rounded-lg shadow-lg z-10">
          {isLoading ? (
            <li className="p-3 text-gray-400">Loading...</li>
          ) : (
            locationOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="p-3 cursor-pointer hover:bg-[var(--bg3)] transition-colors rounded-md"
              >
                {option.name}, {option.admin1}, {option.country}
              </li>
            ))
          )}
        </ul>
      )}
        </div>
      </form>

      
    </div>
  );
};

export default Hero;