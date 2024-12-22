import React from "react"
import Dropdown from "./Dropdown"

export default function Header({ isDropdownOpen, setIsDropdownOpen, list, stage }) {

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const dropdownRef = React.useRef(null)


    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false)
        }
    }

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    return (
        <>
            <header className="grid grid-cols-12 align-center w-full p-1 mb-[5px] mt-[80px] sm:mt-[60px] md:mt-[40px] lg:mt-[20px] relative" ref={dropdownRef}>
                <h1 className="col-start-2 col-span-10 text-2xl font-black uppercase leading-normal text-center">Context.io</h1>
                <div className={`col-start-12 col-span-1 justify-self-end self-center rounded-full hover:bg-con-600 p-[5px] cursor-pointer ${isDropdownOpen ? "bg-con-600" : ""}`} onClick={toggleDropdown}>
                    <img className=" w-[19px] h-[19px] " src='./drop.svg' alt="logo" />
                </div>
                { isDropdownOpen && <Dropdown list={list} stage={stage} setIsDropdownOpen={setIsDropdownOpen}/>}
            </header>
        </>
    )
}
