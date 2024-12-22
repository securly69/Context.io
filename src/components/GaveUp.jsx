import React from 'react'
import { isMobile, isFirefox, isChrome, getChart, SHARE_RESET_TIMEOUT } from '../store/utils'
import useShareMessage from '../store/useShareMessage'

export default function GaveUp({ setIsPrevOpen, setIsWordsOpen, game }) {

    const gameId = game.openGameId
    const gaveUp = game.gameData[0].gaveUp
    const guesses = game.gameData[0].guessHistory
    const attempts = game.gameData[0].numberOfAttempts
    const tips = game.gameData[0].numberOfTips
    const chart = getChart(guesses)
    
    const guessText = attempts === 1 ? 'guess' : 'guesses'
    const tipText = tips === 1 ? 'hint' : 'hints'
    const finalTipText = tips > 0 ? ` and ${tips} ${tipText}` : ''

    const [sharedMsg, displaySharedMsg] = useShareMessage("Share anyway", SHARE_RESET_TIMEOUT)

    const handleShareButton = () => {
        let messageText = `I played context-dot-io.vercel.app #${gameId} but I gave up in ${attempts} ${guessText}${finalTipText}. \n\n`
        messageText += chart

        if ((isMobile() || isChrome()) && !isFirefox() && navigator.share) {
            navigator
                .share({ text: messageText })
                .then(() => {
                    displaySharedMsg('Done')
                })
                .catch(() => { })
        } else {
            navigator.clipboard.writeText(messageText)
            displaySharedMsg('Copied')
        }
    }

    return (
        <>
            <section className="flex bg-con-600 flex-col justify-center items-center w-full mt-[10px] px-[40px] pb-[20px] pt-[40px] rounded-[5px]">
                <p className="text-xl font-black text-center">Better luck in the next one!</p>
                <p className='text-lg font-bold text-wrap leading-[1.2] text-center mt-[10px]'>
                    {`You gave up for `}
                    <span className="font-black">#{gameId}</span>
                </p>
                <p className='text-lg font-bold text-wrap leading-[1.2] text-center mb-[5px]'>
                    {` in `}
                    <span className='font-black'>{attempts}</span>
                    {` ${guessText}${tips > 0 ? ` and ` : ''}`}
                    {tips > 0 && <span className='font-black'>{tips}</span>}
                    {tips > 0 && ` ${tipText}.`}
                </p>
                <p className='text-lg font-semibold text-wrap text-center mt-[20px]'>The word was <span className="uppercase font-black">{gaveUp}</span>.</p>
                <div className='text-lg font-bold text-wrap text-left my-[10px] whitespace-pre'>{chart}</div>
                <button
                    type="button"
                    onClick={handleShareButton}
                    className='bg-con-900 px-[18px] py-[10px] rounded-[5px] flex justify-center items-center mx-auto cursor-pointer'>
                    <img alt="share" src="./share.svg" className="w-[15px] h-[15px] mr-[10px] invert" />
                    <span className="text-lg leading-normal font-bold text-con-200">{sharedMsg}</span>
                </button>
                <p className='text-base font-bold text-wrap text-center mt-[20px] mb-[5px]'>Play again:</p>
                <button
                    type="button"
                    onClick={() => setIsPrevOpen(true)}
                    className='bg-con-900 px-[18px] py-[10px] rounded-[5px] flex justify-center items-center mx-auto cursor-pointer'>
                    <img alt="Previous Games" src="./calendar.svg" className="w-[15px] h-[15px] mr-[10px] invert" />
                    <span className="text-lg leading-normal font-bold text-con-200">Previous Games</span>
                </button>
            </section>
            <button
                type="button"
                onClick={() => setIsWordsOpen(true)}
                className='bg-con-900 px-[18px] py-[10px] rounded-[5px] m-[30px] flex justify-center items-center mx-auto cursor-pointer'>
                <img alt="Closest Words" src="./see.svg" className="w-[15px] h-[15px] mr-[10px] invert" />
                <span className="text-lg leading-normal font-bold text-con-200">Closest Words</span>
            </button>
        </>
    )
}


