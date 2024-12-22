import React from "react"

export default function How() {
    return (
        <section className="flex bg-con-600 flex-col justify-start items-center w-full mt-[10px] py-[15px] pl-[15px] pr-[35px] rounded-[5px]">
            <div className="flex gap-[10px] justify-start items-center w-full mb-[15px]">
                <img className="w-[15px] h-[15px]" src='./q-rounded.svg' alt="question" />
                <h4 className="text-[20px] leading-[20px] font-black">How to play</h4>
            </div>
            <div className="flex flex-col gap-[8px] justify-start items-left w-full">
                <p className="text-base leading-normal font-bold">Find the secret word. You have unlimited guesses.</p>
                <p className="text-base leading-normal font-bold">The words were sorted by an artificial intelligence algorithm according to how similar they were to the secret word.</p>
                <p className="text-base leading-normal font-bold">After submitting a word, you will see its position. The secret word is number 1.</p>
                <p className="text-base leading-normal font-bold">The algorithm analyzed thousands of texts. It uses the context in which words are used to calculate the similarity between them.</p>
            </div>
        </section>
    )
}


