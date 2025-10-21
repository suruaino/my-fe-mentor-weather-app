// import { useState } from "react";
// import logo from "/logo/logo.svg"
// import unit from "/icons/icon-units.svg";
// import { FaCheck } from "react-icons/fa";
// import dropdown from "/icons/icon-dropdown.svg";

// const Header = () => {
// const [showDropdown, setshowDropdown] = useState(false);

// const toggleDropdown = () => {
//     setshowDropdown((prev) => !prev);
// }               
    
//     return (
//       <>
//         <header className="h-[4rem] w-full px-2 flex justify-between items-center border border-red-600">
//           <div className="logo">
//             <img src={logo} alt="Main Logo" />
//           </div>
//           <button
//             className="border p-4 py-3 flex gap-3 rounded-xl"
//             onClick={toggleDropdown}
//           >
//             <img src={unit} alt="" />
//             <span>Units</span>
//             <img src={dropdown} alt="" className="w-5" />
//           </button>
//           {showDropdown && (
//             <div className="bg-[var(--bg2)] w-[12rem] p-3 dropdown absolute right-0 top-[4rem] rounded-md">
//               <button className="w-full h-10 border border-gray-600 rounded-lg">
//                 Switch to Imperial
//               </button>
//               <div className="flex flex-col gap-4">
//                 <ul className="flex flex-col gap-2">
//                   <p className="text-gray-400">Temperature</p>
//                   <li className="flex justify-between items-center">
//                     <span>Celcius (C)</span>{" "}
//                     <span>
//                       <FaCheck className="w-3"/>
//                     </span>
//                   </li>
//                   <li className="flex justify-between items-center">
//                     <span>Fehrenheit (F)</span>{" "}
//                     <span>
//                       <FaCheck className="w-3"/>
//                     </span>
//                   </li>
//                 </ul>

//                 <hr className="border border-gray-600"/>

//                 <ul className="flex flex-col gap-2">
//                   <p className="text-gray-400">Wind Speed</p>
//                   <li className="flex justify-between items-center">
//                     <span>km/hr</span>{" "}
//                     <span>
//                       <FaCheck className="w-3"/>
//                     </span>
//                   </li>
//                   <li className="flex justify-between items-center">
//                     <span>mph</span>{" "}
//                     <span>
//                       <FaCheck className="w-3"/>
//                     </span>
//                   </li>
//                 </ul>

//                 <hr className="border border-gray-600"/>

//                 <ul className="flex flex-col gap-2">
//                   <p className="text-gray-400">Precipitation</p>
//                   <li className="flex justify-between items-center">
//                     <span>Millimeters(mm)</span>{" "}
//                     <span>
//                       <FaCheck className="w-3"/>
//                     </span>
//                   </li>
//                   <li className="flex justify-between items-center">
//                     <span>Inches (in)</span>{" "}
//                     <span>
//                       <FaCheck className="w-3"/>
//                     </span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           )}
//         </header>
//       </>
//     );
// }

// export default Header;

import { useState, useEffect, useRef } from "react";
import { useUnit } from "../context/UnitContext";
import logo from "/logo/logo.svg";
import unit from "/icons/icon-units.svg";
import dropdown from "/icons/icon-dropdown.svg";
import { FaCheck } from "react-icons/fa";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { unitSystem, toggleUnits } = useUnit();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="h-[4rem] w-full px-4 flex justify-between items-center border border-gray-700 relative">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Main Logo" className="h-8" />
      </div>

      {/* Units button */}
      <button
        onClick={toggleDropdown}
        className="border border-gray-700 px-4 py-2 flex items-center gap-3 rounded-xl hover:bg-[var(--bg2)] transition"
      >
        <img src={unit} alt="" className="w-5" />
        <span>Units</span>
        <img src={dropdown} alt="" className={`w-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown menu */}
      {showDropdown && (
        <div ref={dropdownRef} className="absolute right-4 top-[3.5rem] w-[14rem] bg-[var(--bg2)] border border-gray-700 rounded-lg shadow-lg p-3 flex flex-col gap-4 z-50">
          <button
            onClick={toggleUnits}
            className="w-full h-10 border border-gray-600 rounded-lg hover:bg-[var(--bg3)] transition"
          >
            Switch to {unitSystem === "metric" ? "Imperial" : "Metric"}
          </button>

          {/* Temperature */}
          <section>
            <p className="text-gray-400 text-sm mb-2">Temperature</p>
            <ul className="flex flex-col gap-2">
              <li className="flex justify-between items-center">
                <span>Celsius (°C)</span>
                {unitSystem === "metric" && <FaCheck className="w-3 text-[var(--accent)]" />}
              </li>
              <li className="flex justify-between items-center">
                <span>Fahrenheit (°F)</span>
                {unitSystem === "imperial" && <FaCheck className="w-3 text-[var(--accent)]" />}
              </li>
            </ul>
          </section>

          <hr className="border border-gray-700" />

          {/* Wind Speed */}
          <section>
            <p className="text-gray-400 text-sm mb-2">Wind Speed</p>
            <ul className="flex flex-col gap-2">
              <li className="flex justify-between items-center">
                <span>km/h</span>
                {unitSystem === "metric" && <FaCheck className="w-3 text-[var(--accent)]" />}
              </li>
              <li className="flex justify-between items-center">
                <span>mph</span>
                {unitSystem === "imperial" && <FaCheck className="w-3 text-[var(--accent)]" />}
              </li>
            </ul>
          </section>

          <hr className="border border-gray-700" />

          {/* Precipitation */}
          <section>
            <p className="text-gray-400 text-sm mb-2">Precipitation</p>
            <ul className="flex flex-col gap-2">
              <li className="flex justify-between items-center">
                <span>Millimeters (mm)</span>
                {unitSystem === "metric" && <FaCheck className="w-3 text-[var(--accent)]" />}
              </li>
              <li className="flex justify-between items-center">
                <span>Inches (in)</span>
                {unitSystem === "imperial" && <FaCheck className="w-3 text-[var(--accent)]" />}
              </li>
            </ul>
          </section>
        </div>
      )}
    </header>
  );
};

export default Header;
