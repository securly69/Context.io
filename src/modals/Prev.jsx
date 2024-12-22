import React from 'react'
import ReactDOM from 'react-dom'
import { getInitialTime, getCurrentTime, getTodaysGameId } from '../store/utils'
import useModalAnimation from '../store/useModalAnimation' 

export default function Prev({ isOpen, onClose, gameData, onSelectGame}) {

    const { visible, animate } = useModalAnimation(isOpen)

    if (!isOpen && !visible) return null

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const today = getCurrentTime()
    const firstDay = getInitialTime()
    const todaysGameId = getTodaysGameId()

    const numberOfDays = today.diff(firstDay, 'days') + 1

    const prevGames = [...Array(numberOfDays)].map((_, i) => ({
        date: today.subtract(i, 'day'),
        gameId: todaysGameId - i 
    }))

    const getGameStatus = (checkGameId) => {
        if (gameData.find((currGame) => currGame.gameId === checkGameId) === undefined) {
            return ''
        }

        const targetIndex = gameData.findIndex((currGame) => currGame.gameId === checkGameId)

        if (gameData[targetIndex].foundWord) {
            return 'Got it'
        }

        if (gameData[targetIndex].gaveUp) {
            return 'Gave up'
        }

        if (
            !gameData[targetIndex].gaveUp &&
            !gameData[targetIndex].foundWord &&
            gameData[targetIndex].numberOfAttempts > 0
        ) {
            return 'In progress'
        }

        return ''
    }

    const randomGames = prevGames.filter((currGame) => getGameStatus(currGame.gameId) === '' && currGame.gameId !== todaysGameId)

    const selectRandomGame = () => {
        const selectedIndex = Math.floor(Math.random() * randomGames.length)
        const selectedGameId = randomGames[selectedIndex].gameId
        onSelectGame(selectedGameId)
        onClose()
    }

    const selectGame = (selectedGameId) => {
        onSelectGame(selectedGameId)
        onClose()
    }

    let dateFormat = 'ddd, MMM D'

    const prevGamesList = prevGames.map((currGame) => {
        return (
            <button
                type="button"
                key={currGame.gameId}
                onClick={() => selectGame(currGame.gameId)}
                className='bg-con-900 px-[18px] py-[12px] rounded-[5px] flex gap-3 w-full items-center cursor-pointer'>
                <span className="text-[18px] leading-none font-bold text-con-200">#{currGame.gameId}</span>
                <span className="text-[14px] leading-none font-bold text-con-200 ">{currGame.date.format(dateFormat)}</span>
                <span className="text-[18px] leading-none font-bold text-con-200 ml-auto">{getGameStatus(currGame.gameId)}</span>
            </button>
        )
    })

    return ReactDOM.createPortal(
        <div className={`fixed inset-0 bg-black bg-opacity-[0.35] flex justify-center items-center z-50 transition-opacity duration-150 ${animate ? 'opacity-100' : 'opacity-0'}`} onClick={handleOverlayClick}>
            <div className={`bg-con-200 rounded-[10px] border-[3px] border-con-900 relative max-w-[480px] w-full sm:w-[480px] md:w-[480px] lg:w-[480px] mx-[15px] transform transition-transform duration-150 ${animate ? 'scale-100' : 'scale-[0.87]'}`}>
                <div className='cursor-pointer absolute -top-[14px] -right-[14px] rounded-full border-[3px] border-con-900 z-15 bg-con-200' onClick={onClose} >
                    <img src="./close.svg" alt="Close" className=" w-[28px] h-[28px] " />
                </div>
                <div className="text-center overflow-y-scroll max-h-[500px] pt-7 pb-4 pr-4 pl-7 mb-[6px] ">
                    <div className="flex justify-start items-center">
                        <p className='text-base font-bold text-wrap text-left'>Select a previous game to play:</p>
                    </div>
                    <button
                        onClick={selectRandomGame}
                        className='bg-con-900 px-[18px] py-[10px] rounded-[5px] my-[15px] flex justify-center items-center mx-auto cursor-pointer'>
                        <img alt="random" src="./random.svg" className="w-[15px] h-[15px] mr-[10px] invert" />
                        <span className="text-lg leading-normal font-bold text-con-200">Random</span>
                    </button>
                    <div className="flex flex-col gap-[7px] justify-start items-start ">
                        {prevGamesList}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}