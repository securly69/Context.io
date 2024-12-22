import { useState, useEffect } from 'react'
import { ANIMATION_DELAY, CLOSE_ANIMATION_DELAY } from './utils'

const useModalAnimation = (isOpen) => {
    const [visible, setVisible] = useState(false)
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setVisible(true)
            setTimeout(() => setAnimate(true), ANIMATION_DELAY)
        } else {
            setAnimate(false)
            setTimeout(() => setVisible(false), CLOSE_ANIMATION_DELAY)
        }
    }, [isOpen])

    return { visible, animate }
}

export default useModalAnimation