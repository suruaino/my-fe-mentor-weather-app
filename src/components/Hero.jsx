

import searchIcon from "/icons/icon-search.svg"
import styles from "./hero.module.css";

const Hero = ({handleSearchInput, searchLocation, isLoading}) => {

    return(
        <div className={`hero max-w-[90%] md:h-[10rem] w-full mt-10 flex flex-col items-center justify-center self-center gap-8`}>
            <h1 className="text-6xl text-center md:text-3xl">How's the sky looking today?</h1>
            <div className="search w-full md:max-w-[60%] mt-10 md:mt-0 flex flex-col md:flex-row self-center gap-2">
                <div className="input w-full bg-[var(--bg2)] px-4 flex gap-2 rounded-md">
                    <img src={searchIcon} alt="search-icon" className="w-5"/>
                    <input onChange={handleSearchInput} type="text" placeholder="Search for a place..." className={`w-full px-2 h-10 bg-transparent active:outline-1 border-0 ${styles.input}`}/>
                </div>
                <button onClick={searchLocation} className="bg-[var(--blue)] h-10 px-4 rounded-md">{isLoading? "Searching..." : "Search"}</button>
            </div>
        </div>
    )
}

export default Hero;