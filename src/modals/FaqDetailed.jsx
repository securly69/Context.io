import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import useModalAnimation from '../store/useModalAnimation'  
import { FAQ_DATA } from '../store/utils'

export default function FaqDetailed({ isOpen, onClose }) {

    const { visible, animate } = useModalAnimation(isOpen)
    const [visibilityStates, setVisibilityStates] = useState(FAQ_DATA.map(() => false))

    if (!isOpen && !visible) return null

    const toggleVisibility = (index) => {
        setVisibilityStates((prevStates) => {
            const newStates = [...prevStates]
            newStates[index] = !newStates[index]
            return newStates
        })
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }


    const faqList = FAQ_DATA.map((item, index) => {
        return (
            <div key={index} className={`flex flex-col justify-start items-left w-full pb-[10px] ${index === (FAQ_DATA.length - 1) ? "" : "border-b border-con-100"}`}>
                <div className="flex flex-row gap-[8px] justify-between items-left w-full cursor-pointer" onClick={() => toggleVisibility(index)}>
                    <h5 className="text-base leading-normal font-bold">{item.question}</h5>
                    <img src="./expand.svg" className={`w-[25px] h-[25px] transition-transform duration-200 ${visibilityStates[index] ? 'rotate-180' : 'rotate-0'}`} alt="see answer" />
                </div>
                <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${visibilityStates[index] ? 'max-h-[400px]' : 'max-h-0'}`} >
                    <h6 className="text-base font-medium pt-[15px]"> {item.answer} </h6>
                </div>
            </div>
        )
    })

    return ReactDOM.createPortal(
        <div className={`fixed inset-0 bg-black bg-opacity-[0.35] flex justify-center items-center z-50 transition-opacity duration-150 ${animate ? 'opacity-100' : 'opacity-0'}`} onClick={handleOverlayClick}>
            <div className={`p-1 bg-con-200 rounded-[10px] border-[3px] border-con-900 relative max-w-[480px] sm:w-[480px] md:w-[480px] lg:w-[480px] mx-[15px] transform transition-transform duration-150 ${animate ? 'scale-100' : 'scale-[0.87]'}`}>
                <div className='cursor-pointer absolute -top-[14px] -right-[14px] rounded-full border-[3px] border-con-900 z-15 bg-con-200' onClick={onClose} >
                    <img src="./close.svg" alt="Close" className=" w-[28px] h-[28px] " />
                </div>
                <div className='overflow-y-scroll max-h-[480px] pb-5 pl-7 pr-5 pt-7 '>
                    <div className="flex flex-col gap-[15px] justify-start items-left w-full">
                        <div className="flex justify-start items-center pb-[10px]">
                            <img alt="FAQ" src="./q-square.svg" className="w-[20px] h-[20px] mr-[10px]" />
                            <p className=" text-xl leading-none font-black">FAQ</p>
                        </div>
                        {faqList}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}