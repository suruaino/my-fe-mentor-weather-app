
import logo from "/logo/logo.svg"
import unit from "/icons/icon-units.svg";
import dropdown from "/icons/icon-dropdown.svg";

const Header = () => {

    return(
        <>
        <header className="h-[4rem] w-full px-2 flex justify-between items-center border border-red-600">
            <div className="logo">
                <img src={logo} alt="Main Logo" />
            </div>
            <button className="border p-4 py-3 flex gap-3 rounded-xl">
                <img src={unit} alt="" />
                <span>Units</span>
                <img src={dropdown} alt="" className="w-5" />
            </button>
        </header>
        
        </>
    )
}

export default Header;