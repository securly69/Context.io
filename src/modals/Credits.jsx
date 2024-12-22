import React from 'react'
import ReactDOM from 'react-dom'
import useModalAnimation from '../store/useModalAnimation' 

export default function Credits({ isOpen, onClose }) {
    
    const { visible, animate } = useModalAnimation(isOpen)

    if (!isOpen && !visible) return null
    
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return ReactDOM.createPortal(
        <div className={`fixed inset-0 bg-black bg-opacity-[0.35] flex justify-center items-center z-50 transition-opacity duration-150 ${animate ? 'opacity-100' : 'opacity-0'}`} onClick={handleOverlayClick}>
            <div className={`bg-con-200 pb-5 pl-7 pr-5 pt-7 rounded-[10px] border-[3px] border-con-900 relative max-w-[480px] sm:w-[480px] md:w-[480px] lg:w-[480px] mx-[15px] transform transition-transform duration-150 ${animate ? 'scale-100' : 'scale-[0.87]'}`}>
                <div className='cursor-pointer absolute -top-[14px] -right-[14px] rounded-full border-[3px] border-con-900 z-15 bg-con-200' onClick={onClose} >
                    <img src="./close.svg" alt="Close" className=" w-[28px] h-[28px] " />
                </div>
                <div className="text-center">
                    <div className="flex justify-start items-center ml-2 ">
                        <img alt="Credits" src="./info.svg" className="w-[20px] h-[20px] mr-[10px]" />
                        <p className=" text-xl leading-none font-black">Credits</p>
                    </div>
                    <div className="flex flex-col gap-2 justify-start items-start mt-[15px] mb-[8px] ml-2">
                        <p className='text-base font-bold text-wrap text-left'>Replica of <a className='font-black cursor-pointer text-lg' href='https://www.contexto.me/'  target="_blank" rel="noopener noreferrer">Contexto</a>, but <span className='font-black text-lg'>without ads</span> and <span className='font-black text-lg'>cookies</span>.</p>
                        <p className='text-base font-bold text-wrap text-left'>All word proximity calculations are based on <a className='font-black cursor-pointer text-lg' href='https://nlp.stanford.edu/projects/glove/'  target="_blank" rel="noopener noreferrer">GloVe</a> .</p>
                        <p className='text-base font-bold text-wrap text-left'>Keep playing, keep guessing!</p>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}