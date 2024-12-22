import React from "react"

export default function Faq() {
  const [visAns1, setVisAns1] = React.useState(false)
  const [visAns2, setVisAns2] = React.useState(false)

  return (
    <section className="flex flex-col justify-start items-center w-full mt-[10px] px-[15px] pt-[15px] pb-[10px] ">

      <div className="flex gap-[10px] justify-start items-center w-full mb-[20px]">
        <img className="w-[15px] h-[15px]" src="./q-square.svg" alt="question" />
        <h4 className="text-[20px] leading-[20px] font-black">FAQ</h4>
      </div>

      <div className="flex flex-col gap-[15px] justify-start items-left w-full">
        <div className="flex flex-col justify-start items-left w-full pb-[10px] border-b border-con-100 ">
          <div className="flex flex-row gap-[8px] justify-between items-left w-full cursor-pointer" onClick={() => setVisAns1(!visAns1)}>
            <h5 className="text-base leading-normal font-bold">How is the word order defined?</h5>
            <img src="./expand.svg" className={`w-[25px] h-[25px] transition-transform duration-300 ${visAns1 ? 'rotate-180' : 'rotate-0'}`} alt="see answer" />
          </div>
          <div className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${visAns1 ? 'max-h-[400px]' : 'max-h-0'}`} >
            <h6 className="text-base font-medium pt-[15px]"> The game uses an artificial intelligence algorithm and thousands of texts to calculate the similarity of the words in relation to the word of the day. Not necessarily it is related to the meaning of the words, but to the proximity in which they are used on the internet. For example, if the word of the day were “infinite”, words related to “love” or words related to “universe” might be close to the word of the day because “infinite” is commonly used in those two different contexts. In similar reasoning, if “tv” and “television”, for example, are in very different positions, it means that they are used differently in relation to the word of the day, despite being the same object. </h6>
          </div>
        </div>

        <div className="flex flex-col justify-start items-left w-full">
          <div className="flex flex-row gap-[8px] justify-between items-left w-full cursor-pointer" onClick={() => setVisAns2(!visAns2)}>
            <h5 className="text-base leading-normal font-bold">How can I ask for a hint?</h5>
            <img src="./expand.svg" className={`w-[25px] h-[25px] transition-transform duration-300 ${visAns2 ? 'rotate-180' : 'rotate-0'}`} alt="see answer" />
          </div>
          <div className={`overflow-hidden transition-[max-height] duration-700 ease-[cubic-bezier(0.12, 0, 0.39, 0)] ${visAns2 ? 'max-h-[200px]' : 'max-h-0 '}`} >
            <h6 className="text-base font-medium pt-[15px]"> Click on the three dots located on the upper right corner of the screen and select the option “Hint” and it will reveal one word. </h6>
          </div>
        </div>
      </div>

    </section>
  )
}
