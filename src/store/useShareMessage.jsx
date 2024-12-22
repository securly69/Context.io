import { useState } from 'react'

const useShareMessage = (initialMessage = "Share", resetTimeout = 2000) => {
    const [sharedMsg, setSharedMsg] = useState(initialMessage)

    const displaySharedMsg = (msg) => {
        setSharedMsg(msg)
        setTimeout(() => setSharedMsg(initialMessage), resetTimeout)
    }

    return [sharedMsg, displaySharedMsg]
}

export default useShareMessage