import React from "react"

export default function Loading({text, padding}) {
    return (
        <div className={`loading-text mr-auto ${padding}`}>
            {text.split('').map((char, index) => (
                <span key={index} className='font-bold text-con-900 text-lg' style={{ '--i': index + 1 }}>{char}</span>
            ))}
        </div>
    )
}
