import React from "react"

export default function Dropdown({ list, stage, setIsDropdownOpen }) {

    const listElements = list.map((item, index) => {

        const val = (stage === 3 || stage === 4) && (item.text === 'Give up' || item.text === 'Hint')

        return (
            <button key={index} type="button" className={` w-full flex justify-start items-center px-[15px] py-[10px] ${val ? "cursor-default" : "hover:bg-con-600 rounded-[5px] cursor-pointer" } `} onClick={() => { if(!val){item.click()}; setIsDropdownOpen(false)}}>
                <img src={item.icon} alt={item.text} className={`w-[15px] h-[15px] mr-[10px] ${val ? "opacity-50" : "" }`} />
                <p className={`text-base leading-none font-bold ${val ? "opacity-50" : "" }`} >{item.text}</p>
            </button>
        )
    })

    return (
        <>
            <div className="absolute top-[37px] right-0 w-48 bg-white shadow-lg rounded-[10px] z-10 p-[10px]">
                {listElements}
            </div>
        </>
    )
}

