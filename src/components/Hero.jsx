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
    <div className="hero relative w-full max-w-[90%] md:max-w-[60%]">
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center"
      >
        <div className="w-full max-w-[60rem] flex gap-2 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent)]"/>
        <input
          type="text"
          placeholder="Search for a location"
          value={searchParam}
          onChange={handleSearchInput}
          className="w-full p-3 pl-12 rounded-l-lg bg-[var(--bg3)] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <button type="submit" className="bg-[var(--blue)] p-3 px-4 rounded-r-lg border border-transparent active:border active:border-[var(--accent)]">
          {isLoading ? "searching..." : "search"}
        </button>
        </div>
      </form>

      {showOptions && locationOptions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg2)] border border-gray-700 rounded-lg shadow-lg z-10">
          {isLoading ? (
            <li className="p-3 text-gray-400">Loading...</li>
          ) : (
            locationOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="p-3 cursor-pointer hover:bg-[var(--bg3)] transition-colors"
              >
                {option.name}, {option.admin1}, {option.country}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Hero;