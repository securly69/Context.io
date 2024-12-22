import React from "react"

export default function Score({ game, guesses, hints }) {
    return (
        <section className="flex justify-start items-baseline w-full px-[10px] gap-[10px]">
            <h2 className="text-xs font-bold">GAME: <span className="text-lg font-black">#{game}</span></h2>
            <h3 className="text-xs font-bold">GUESSES: <span className="text-lg font-black">{guesses}</span></h3>
            { hints!=0 && <h3 className="text-xs font-bold">HINTS: <span className="text-lg font-black">{hints}</span></h3> }
        </section>
    )
}