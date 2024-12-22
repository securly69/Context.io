import React, { useState } from "react"
import { getBarWidth, getBarColor, wordExists, ERROR_MESSAGES, INPUT_LOADING_TEXT } from "../store/utils"
import Loading from "./Loading"

export default function Input({ game, setGame, loading, setLoading, error, setError }) {
    const [inputValue, setInputValue] = useState("")
    let stage = game.stage

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            const trimmedInput = inputValue.trim()
            if (/^[a-zA-Z\s]+$/.test(trimmedInput) && /\s/.test(trimmedInput)) {
                handleError(ERROR_MESSAGES.singleWord)
            } else if (/[^a-zA-Z]/.test(trimmedInput)) {
                handleError(ERROR_MESSAGES.invalidWord)
            } else if (trimmedInput !== "") {
                await handleWordSubmission(trimmedInput.toLowerCase())
            }
        }
    }

    const handleError = (message, theWord = "") => {
        setError(theWord ? { word: theWord } : { error: message })
        setInputValue("")
        setLoading(false)
    }

    const handleWordSubmission = async (finalWord) => {
        try {
            setLoading(true)
            const wordExistsInHistory = wordExists(finalWord, game.gameData[0].guessHistory)
            const wordExistsInPostGame = wordExists(finalWord, game.gameData[0].postGame)

            if (wordExistsInHistory || wordExistsInPostGame) {
                handleError("", finalWord)
            } else {
                //const cacheBuster = `?_=${new Date().getTime()}`
                const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.contexto.me/machado/en/game/${game.gameData[0].gameId}/${finalWord}`)}`)
                if (response.ok) {
                    const dataJSON = await response.json()
                    const data = JSON.parse(dataJSON.contents)
                    if (data.error) {
                        handleError(data.error)
                    } else {
                        processWordData(data)
                    }
                } else {
                    handleError(ERROR_MESSAGES.fetchError)
                }
            }
        } catch (error) {
            handleError(ERROR_MESSAGES.fetchError)
        }
    }

    const processWordData = (data) => {
        const word = { lemma: data.lemma, distance: data.distance }
        const wordExistsInHistory = wordExists(data.lemma, game.gameData[0].guessHistory)
        const wordExistsInPostGame = wordExists(data.lemma, game.gameData[0].postGame)


        if (game.gameData[0].gaveUp || game.gameData[0].foundWord) {
            
            if (wordExistsInHistory || wordExistsInPostGame) {
                handleError("", data.lemma)
            }
            else {
                const val = game.gameData[0].gaveUp ? 3 : 4
                updateGameState(word, true, val)
            }
        } else {
            const wordExists = game.gameData[0].guessHistory.some((currWord) => currWord.distance === word.distance)

            if (wordExistsInHistory) {
                handleError("", data.lemma)
            } else {
                updateGameState(word, false)
            }
        }
    }

    const updateGameState = (word, isPostGame, val = 2) => {
        setError(null)
        setGame((prevGame) => {
            const updatedGame = { ...prevGame }
            updatedGame.gameData[0].lastGuess = [word]
            if (isPostGame) {
                updatedGame.gameData[0].postGame.push(word)
                updatedGame.stage = val
            } else {
                updatedGame.gameData[0].guessHistory.push(word)
                updatedGame.gameData[0].numberOfAttempts += 1
            }
            if (word.distance === 0) {
                updatedGame.stage = 4
                updatedGame.gameData[0].foundWord = word.lemma
            } else {
                updatedGame.stage = val
            }
            return updatedGame
        })
        setInputValue("")
        setLoading(false)
    }

    return (
        <>
            <section className="flex justify-start items-center w-full my-[10px]">
                <input
                    type="text"
                    id="input"
                    className="bg-con-200 border-solid border-[1px] border-slate-900 w-full px-[15px] py-[10px] rounded-[5px] text-[22.5px] font-bold placeholder:text-slate-500 placeholder:text-[22.5px] placeholder:font-bold"
                    placeholder="type a word"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={20}
                />
            </section>
            {
                loading && (
                    <div className="w-full h-[45px] flex flex-col items-left justify-center mt-4 mb-5 pl-2" >
                        <Loading text={INPUT_LOADING_TEXT} padding={"p-1"}/>
                    </div>
                )
            }
            {
                stage > 1 && !loading && error && error.word && (
                    <div className="w-full h-[45px] flex flex-col items-left justify-center mt-4 mb-5" >
                        <p className="text-con-900 font-bold text-lg pl-2" >The word <span className="font-black" >{error.word}</span> was already guessed.</p>
                    </div>
                )
            }
            {
                !loading && error && error.error && (
                    <div className="w-full h-[45px] flex flex-col items-left justify-center mt-4 mb-5" >
                        <p className="text-con-900 font-bold text-lg pl-2" >{error.error}</p>
                    </div>
                )
            }
            {
                stage > 1 && !error && !loading && game.gameData[0].lastGuess[0] && (
                    <div className={`relative w-full h-[45px] flex items-center justify-between mt-4 mb-5`} key={game.gameData[0].lastGuess[0].lemma}>
                        <div className={`absolute w-full h-full overflow-hidden  bg-con-600 rounded-[8px] border-[3px] border-con-900`}>
                            <div
                                className={`min-w-[1%] h-full rounded-[5px] ${getBarColor(game.gameData[0].lastGuess[0].distance)} `}
                                style={{ width: getBarWidth(game.gameData[0].lastGuess[0].distance) }}
                            />
                        </div>
                        <div className="relative w-full flex items-center justify-between">
                            <span className={`font-black px-3 text-lg leading-none`}>{game.gameData[0].lastGuess[0].lemma}</span>
                            <span className={`font-black px-3 text-lg leading-none`}>{game.gameData[0].lastGuess[0].distance + 1}</span>
                        </div>
                    </div>
                )
            }
        </>
    )
}