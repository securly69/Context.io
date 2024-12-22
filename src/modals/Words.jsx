import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { getBarWidth, getBarColor, WORDS_LOADING_TEXT, WORDS_ERROR_TEXT, WORDS_CLOSE_TIMEOUT } from "../store/utils"
import useModalAnimation from '../store/useModalAnimation'
import Loading from '../components/Loading'

export default function Words({ isOpen, onClose, gameId }) {

    const { visible, animate } = useModalAnimation(isOpen)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [words, setWords] = useState([])

    useEffect(() => {
        if (isOpen) {
            fetchWords()
        }
    }, [isOpen])

    const handleError = () => {
        setLoading(false)
        setError(true)
        setTimeout(() => {
            onClose()
        }, WORDS_CLOSE_TIMEOUT)
    }

    async function fetchWords() {
        setLoading(true)
        setError(false)
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.contexto.me/machado/en/top/${gameId}`)}`)
            if (response.ok) {
                const dataJSON = await response.json()
                const data = JSON.parse(dataJSON.contents)
                setWords(data.words)
                setLoading(false)
            }
            else {
                handleError()
            }
        }
        catch (error) {
            handleError()
        }
    }

    if (!isOpen && !visible) return null

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return ReactDOM.createPortal(
        <div className={`fixed inset-0 bg-black bg-opacity-[0.35] flex justify-center items-center z-50 transition-opacity duration-150 ${animate ? 'opacity-100' : 'opacity-0'}`} onClick={handleOverlayClick}>
            <div className={`bg-con-200 rounded-[10px] border-[3px] border-con-900 relative max-w-[480px] w-full sm:w-[480px] md:w-[480px] lg:w-[480px] mx-[15px] transform transition-transform duration-150 ${animate ? 'scale-100' : 'scale-[0.87]'}`}>
                <div className='cursor-pointer absolute -top-[14px] -right-[14px] rounded-full border-[3px] border-con-900 z-15 bg-con-200' onClick={onClose} >
                    <img src="./close.svg" alt="Close" className=" w-[28px] h-[28px] " />
                </div>
                { loading && <Loading text={WORDS_LOADING_TEXT} padding={"p-4"}/> }
                {!loading && error &&
                    <div className="font-bold text-con-900 text-lg mr-auto p-4">{WORDS_ERROR_TEXT}</div>
                }
                {!loading && !error && words &&
                    <div className="text-center overflow-y-scroll max-h-[450px] pt-7 pb-4 pl-7 pr-4 mb-[6px]">
                        <div className="flex justify-start items-center mt-2">
                            <p className=" text-base leading-none font-bold">Today's word (#<span className="text-base leading-none font-black" >{gameId}</span>) was:</p>
                        </div>
                        <div className="flex justify-center items-center my-[15px]">
                            <p className=" text-xl leading-none font-black">{words[0]}</p>
                        </div>
                        <div className="flex justify-start items-center my-4">
                            <p className=" text-base leading-none font-bold">These were the 500 closest words:</p>
                        </div>
                        <div className="flex flex-col gap-[7px] justify-start items-start">
                            {words.length > 0 &&
                                words.map((word, distance) => {
                                    return (
                                        <div className={`relative w-full h-[35px] flex items-center justify-between rounded-[5px]`} key={word}>
                                            <div className="absolute w-full h-full bg-con-600 rounded-[5px]">
                                                <div
                                                    className={`min-w-[1%] h-full rounded-[5px] ${getBarColor(distance)} `}
                                                    style={{
                                                        width: getBarWidth(distance)
                                                    }}
                                                />
                                            </div>
                                            <div className="relative w-full flex items-center justify-between">
                                                <span className='font-bold p-3 text-lg leading-none'>{word}</span>
                                                <span className='font-bold p-3 text-lg leading-none'>{distance + 1}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}