import { useState, useEffect } from 'react'
import { getTodaysGameId } from './utils'

const useGameState = () => {
    const [game, setGame] = useState({
        gameData: [],
        stage: 0,
        openGameId: null
    })

    const todaysGameId = getTodaysGameId()

    useEffect(() => {
        const storedGame = localStorage.getItem('game')
        const gotGame = JSON.parse(storedGame)

        if (storedGame && gotGame.gameData.findIndex((currGame) => currGame.gameId === todaysGameId) === -1) {
            gotGame.gameData.unshift({
                gameId: todaysGameId,
                foundWord: "",
                gaveUp: "",
                guessHistory: [],
                lastGuess: [],
                numberOfAttempts: 0,
                numberOfTips: 0,
                postGame: []
            })
            gotGame.openGameId = todaysGameId
            gotGame.stage = 1

            setGame(gotGame)
        }
        else if (storedGame) {
            setGame(gotGame)
        }  
        else {
            setGame({
                gameData: [
                    {
                        gameId: todaysGameId,
                        foundWord: "",
                        gaveUp: "",
                        guessHistory: [],
                        lastGuess: [],
                        numberOfAttempts: 0,
                        numberOfTips: 0,
                        postGame: []
                    }
                ],
                stage: 0,
                openGameId: todaysGameId
            })
        }
    }, [todaysGameId])

    useEffect(() => {
        if (game.gameData.length > 0) {
            localStorage.setItem('game', JSON.stringify(game))
        }
    }, [game])

    return [game, setGame]
}

export default useGameState