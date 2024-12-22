import dayjs from 'dayjs'

const userAgent = navigator.userAgent

const GREEN_THRESHOLD = 300
const YELLOW_THRESHOLD = 1500
const EN_START_DATE = '2024-02-11'
const ANIMATION_DELAY = 30
const CLOSE_ANIMATION_DELAY = 150
const SHARE_RESET_TIMEOUT = 2000

const WORDS_LOADING_TEXT = "Loading..."
const WORDS_ERROR_TEXT = "Error, try again...."
const WORDS_CLOSE_TIMEOUT = 2000

const INPUT_LOADING_TEXT = "Calculating..."

const FAQ_DATA = [
    {
        question: "How is the word order defined?",
        answer: "The game uses an artificial intelligence algorithm and thousands of texts to calculate the similarity of the words in relation to the word of the day. Not necessarily it is related to the meaning of the words, but to the proximity in which they are used on the internet. For example, if the word of the day were “infinite”, words related to “love” or words related to “universe” might be close to the word of the day because “infinite” is commonly used in those two different contexts. In similar reasoning, if “tv” and “television”, for example, are in very different positions, it means that they are used differently in relation to the word of the day, despite being the same object."
    },
    {
        question: "How can I ask for a hint?",
        answer: "Click on the three dots located on the upper right corner of the screen and select the option “Hint” and it will reveal one word."
    },
    {
        question: "I couldn't figure the word out. Can I see what the word of the day is?",
        answer: "In case you don't want to keep trying to guess the word, you have the option to give up. In order to do it, click on the three dots located on the upper right corner of the screen and select the option “Give up”. The word of the day will be displayed on the screen."
    },
    {
        question: "I want to play more than one game a day, is that possible?",
        answer: "Yes. It is possible to play the games of previous days since PlayContexto launch day or to play a random game. To do so, click on the three dots located on the upper right corner of the screen and select the option “Previous games”. You can choose the game of some specific day or play on random mode."
    },
    {
        question: "I couldn't play yesterday. Can I still play yesterday's game?",
        answer: "Yes, the previous games can be played anytime. To do so, click on the three dots located on the upper right corner of the screen and select the option “Previous games”. You can choose the game of some specific day or play on random mode."
    }
]

const ERROR_MESSAGES = {
    singleWord: "Please enter a single word without spaces",
    invalidWord: "Please enter a valid word",
    fetchError: "Error fetching the word, please try again.",
    giveUpError: "Error, please try again",
    hintError: "Error fetching the hint, try again"
}

const isMobile = () => /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
const isFirefox = () => userAgent.toLowerCase().indexOf('firefox') !== -1
const isChrome = () => /Chrome|Edge|OPR/i.test(userAgent)

const wordExists = (word, list) => list.some((currWord) => currWord.lemma === word)

const randomTipDistance = (guessHistory) => {
    const maxDistance = GREEN_THRESHOLD - 1
    let tipDistance = Math.floor(Math.random() * maxDistance - 1) + 1
    
    if (guessHistory.length > 0) {
        const distances = guessHistory.map((guess) => guess.distance)
        while (distances.includes(tipDistance)) {
            tipDistance = Math.floor(Math.random() * maxDistance - 1) + 1
        }
    }
    return tipDistance
}

const nextTipDistance = (guessHistory,) => {
    let tipDistance = GREEN_THRESHOLD - 1
    let lowestDistance = tipDistance

    if (guessHistory.length > 0) {
        const distances = guessHistory.map((guess) => guess.distance)
        lowestDistance = Math.min(...distances, lowestDistance)
        if (lowestDistance > 1) {
            tipDistance = lowestDistance - 1
        } else {
            tipDistance = 2
            while (distances.includes(tipDistance)) {
                tipDistance += 1
            }
        }
    }

    return tipDistance
}

const halfTipDistance = (guessHistory) => {
    let tipDistance = GREEN_THRESHOLD - 1
    let lowestDistance = 2 * tipDistance

    if (guessHistory.length > 0) {
        const distances = guessHistory.map((guess) => guess.distance)
        lowestDistance = Math.min(...distances, lowestDistance)
        if (lowestDistance > 1) {
            tipDistance = Math.floor(lowestDistance / 2)
        }
        else {
            tipDistance = 2
            while (distances.includes(tipDistance)) {
                tipDistance += 1
            }
        }
    }

    return tipDistance
}

const getInitialTime = () => {
    return dayjs(EN_START_DATE, 'YYYY-MM-DD').startOf('day')
}

const getCurrentTime = () => {
    return dayjs()
}

const getTodaysGameId = () => {
    const initialTime = getInitialTime()
    const currentTime = getCurrentTime().startOf('day')
    return currentTime.diff(initialTime, 'day') + 1
}

const getBarWidth = (distance) => {
    const total = 40000
    const lambda = 0.5
    const pdf = (x) => lambda * Math.exp(-lambda * x)
    const startX = 0
    const endX = 100
    const startY = pdf(startX)
    const endY = pdf(endX)
    const x = (distance / total) * (endX - startX)
    let result = ((pdf(x) - endY) / (startY - endY)) * 100
    if (result < 1) {
        result = 1
    }
    return `${result}%`
}

const getBarColor = (distance) => {
    if (distance < GREEN_THRESHOLD) {
        return 'bg-colo-100'
    }
    if (distance < YELLOW_THRESHOLD) {
        return 'bg-colo-200'
    }
    return 'bg-colo-400'
}

const getChart = (guessHistory) => {
    let greenCount = 0
    let yellowCount = 0
    let redCount = 0
    let greenSquares = 0
    let yellowSquares = 0
    let redSquares = 0

    guessHistory.forEach((item) => {
        if (item.distance < 300) greenCount += 1
        else if (item.distance < 1500) yellowCount += 1
        else redCount += 1
    })

    const max = Math.max(greenCount, yellowCount, redCount)
    let total = 20

    if (max <= 25) {
        total = 5
    } else if (max <= 50) {
        total = 10
    } else if (max <= 100) {
        total = 15
    }

    const totalWords = guessHistory.length

    if (totalWords > 0) {
        greenSquares = Math.round((greenCount / totalWords) * total)
        yellowSquares = Math.round((yellowCount / totalWords) * total)
        redSquares = Math.round((redCount / totalWords) * total)

        greenSquares = greenSquares === 0 && greenCount > 0 ? 1 : greenSquares
        yellowSquares = yellowSquares === 0 && yellowCount > 0 ? 1 : yellowSquares
        redSquares = redSquares === 0 && redCount > 0 ? 1 : redSquares

        greenSquares = Math.min(greenCount, greenSquares)
        yellowSquares = Math.min(yellowCount, yellowSquares)
        redSquares = Math.min(redCount, redSquares)
    }

    let chart = ''

    for (let i = 0; i < greenSquares; i++) {
        chart += '🟩'
    }
    chart += ` ${greenCount}\n`

    for (let i = 0; i < yellowSquares; i++) {
        chart += '🟨'
    }
    chart += ` ${yellowCount}\n`
    for (let i = 0; i < redSquares; i++) {
        chart += '🟥'
    }
    chart += ` ${redCount}`

    return chart
}

const getGiveUp = async (newGameId, setError, setLoading) => {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.contexto.me/machado/en/giveup/${newGameId}`)}`)
        if (response.ok) {
            const dataJSON = await response.json()
            const data = JSON.parse(dataJSON.contents)
            return { lemma: data.lemma, distance: data.distance }
        } else {
            setError({ error: ERROR_MESSAGES.giveUpError })
            setLoading(false)
        }
    } catch (error) {
        setError({ error: ERROR_MESSAGES.giveUpError  })
        setLoading(false)
    }
}

const getHint = async (gameId, distance, setError, setLoading) => {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.contexto.me/machado/en/tip/${gameId}/${distance}`)}`)
        if (response.ok) {
            const dataJSON = await response.json()
            const data = JSON.parse(dataJSON.contents)
            return { lemma: data.lemma, distance: data.distance }
        } else {
            setError({ error: ERROR_MESSAGES.hintError })
            setLoading(false)
        }
    } catch (error) {
        setError({ error: ERROR_MESSAGES.hintError})
        setLoading(false)
    }
}

export {
    ANIMATION_DELAY,
    CLOSE_ANIMATION_DELAY,
    SHARE_RESET_TIMEOUT,
    FAQ_DATA,
    ERROR_MESSAGES,
    WORDS_LOADING_TEXT,
    WORDS_ERROR_TEXT,
    WORDS_CLOSE_TIMEOUT,
    INPUT_LOADING_TEXT,
    isMobile, 
    isFirefox,
    isChrome,
    wordExists,
    randomTipDistance,
    nextTipDistance,
    halfTipDistance,
    getInitialTime,
    getCurrentTime,
    getTodaysGameId,
    getBarWidth,
    getBarColor,
    getChart, 
    getGiveUp,
    getHint
}
