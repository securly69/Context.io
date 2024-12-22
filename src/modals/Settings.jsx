import React from 'react'
import ReactDOM from 'react-dom'
import useModalAnimation from '../store/useModalAnimation' 

export default function Settings({ isOpen, onClose, difficulty, setDifficulty, order, setOrder }) {

    const { visible, animate } = useModalAnimation(isOpen)

    if (!isOpen && !visible) return null

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    function handleDifficultyChange(event) {
        setDifficulty(event.target.value)
    }
    function handleOrderChange(event) {
        setOrder(event.target.value)
    }

    return ReactDOM.createPortal(
        <div className={`fixed inset-0 bg-black bg-opacity-[0.35] flex justify-center items-center z-50  transition-opacity duration-150 ${animate ? 'opacity-100' : 'opacity-0'}`} onClick={handleOverlayClick}>
            <div className={`bg-con-200 pt-7 pb-11 px-9 rounded-[10px] border-[3px] border-con-900 relative max-w-[480px] sm:w-[480px] md:w-[480px] lg:w-[480px] mx-[15px] transform transition-transform duration-150 ${animate ? 'scale-100' : 'scale-[0.87]'}`}>
                <div className='cursor-pointer absolute -top-[14px] -right-[14px] rounded-full border-[3px] border-con-900 z-15 bg-con-200' onClick={onClose} >
                    <img src="./close.svg" alt="Close" className=" w-[28px] h-[28px] " />
                </div>
                <div className="text-center flex flex-col gap-9">
                    <div className="flex justify-start items-center">
                        <img alt="Settings" src="./settings.svg" className="w-[20px] h-[20px] mr-[10px]" />
                        <p className=" text-xl leading-none font-black">Settings</p>
                    </div>
                    <div className="flex justify-start w-full">
                        <div className="flex justify-start items-start min-w-[90px] sm:w-min-w-[100px] md:min-w-[110px] lg:min-w-[110px]">
                            <p className=' text-lg leading-none font-bold'>Hints</p>
                        </div>
                        <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col justify-start items-start gap-1">
                                <label className='cursor-pointer text-lg font-bold leading-none'>
                                    <input 
                                        type="radio" 
                                        name="difficulty" 
                                        value="easy" 
                                        checked={difficulty === 'easy'}
                                        onChange={handleDifficultyChange}  /> Easy
                                </label>
                                <p className='text-left font-bold text-sm text-wrap leading-normal pl-[18px]'>The hint's position will be half the position of your closest word</p>
                            </div>
                            <div className="flex flex-col justify-start items-start  gap-1">
                                <label className='cursor-pointer text-lg font-bold leading-none'>
                                    <input 
                                        type="radio" 
                                        name="difficulty" 
                                        value="medium"
                                        checked={difficulty === 'medium'}
                                        onChange={handleDifficultyChange}  /> Medium
                                </label>
                                <p className='text-left font-bold text-sm text-wrap leading-normal pl-[18px]'>The hint's position will be one less than your closest word</p>
                            </div>
                            <div className="flex flex-col justify-start items-start  gap-1">
                                <label className='cursor-pointer text-lg font-bold leading-none'>
                                    <input 
                                        type="radio" 
                                        name="difficulty" 
                                        value="hard"
                                        checked={difficulty === 'hard'}
                                        onChange={handleDifficultyChange}  /> Hard
                                </label>
                                <p className='text-left font-bold text-sm text-wrap leading-normal pl-[18px]'>The hint's position will be random</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start w-full">
                        <div className="flex justify-start items-start min-w-[90px] sm:w-min-w-[100px] md:min-w-[110px] lg:min-w-[110px]">
                            <p className=' text-lg leading-none font-bold'>Sort By</p>
                        </div>
                        <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col justify-start items-start">
                                <label className='cursor-pointer text-lg font-bold leading-none'>
                                    <input 
                                        type="radio" 
                                        name="sortby" 
                                        value="similarity"
                                        checked={order === 'similarity'}
                                        onChange={handleOrderChange} /> Similarity
                                </label>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <label className='cursor-pointer text-lg font-bold leading-none'>
                                    <input 
                                        type="radio" 
                                        name="sortby" 
                                        value="guessorder"
                                        checked={order === 'guessorder'}
                                        onChange={handleOrderChange} /> Guess Order
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}