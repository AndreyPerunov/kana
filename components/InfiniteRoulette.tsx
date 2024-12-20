"use client"
import type { Character } from "@/redux/features/character/characterSlice"

type InfiniteRouletteTypes = {
  learned: ((Character & { correct: boolean }) | " ")[]
  current: Character[]
  toLearn: Character[]
  isSliding: boolean
  duration?: number
  animationEnd: () => void
}

export const InfiniteRoulette = ({ learned, current, toLearn, isSliding, animationEnd, duration = 500 }: InfiniteRouletteTypes) => {
  return (
    <div className="flex gap-4 items-center">
      {/* Left Roulette */}
      <div className="h-16 w-48 sm:w-64 lg:w-96 bg-white rounded-xl overflow-hidden shadow">
        <div
          className={`flex justify-end
            ${isSliding ? "transition-transform ease-in-out" : "translate-x-16"}`}
          style={{
            transitionDuration: isSliding ? duration + "ms" : "0ms",
            transform: isSliding ? "translateX(0)" : "translateX(4rem)"
          }}
        >
          {learned.map((letter, i) => (
            <div key={i} className="size-16 flex justify-center items-center shrink-0">
              <span className={`text-3xl ${letter === " " ? "" : letter.correct ? "text-primary" : "text-fail"}`}>{(letter === " " ? " " : letter.symbol) || ""}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Current Character */}
      <div className="h-20 w-24 bg-white rounded-xl overflow-hidden shadow">
        <div
          className={`flex 
          ${isSliding ? "transition-transform ease-in-out" : "translate-x-0"}`}
          onTransitionEnd={animationEnd}
          style={{
            transitionDuration: isSliding ? duration + "ms" : "0ms",
            transform: isSliding ? "translateX(-6rem)" : "translateX(0)"
          }}
        >
          {current.map((letter, i) => (
            <div key={i} className="h-20 w-24 flex justify-center items-center shrink-0">
              <span className={`text-5xl  ${isSliding ? "text-passive" : "text-secondary"} `}>{letter.symbol || ""}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Right Roulette */}
      <div className="h-16 w-48 sm:w-64 lg:w-96 bg-white rounded-xl overflow-hidden shadow">
        <div
          className={`flex 
          ${isSliding ? "transition-transform ease-in-out" : "translate-x-0"}`}
          style={{
            transitionDuration: isSliding ? duration + "ms" : "0ms",
            transform: isSliding ? "translateX(-4rem)" : "translateX(0)"
          }}
        >
          {toLearn.map((letter, i) => (
            <div key={i} className="size-16 flex justify-center items-center shrink-0">
              <span className="text-passive text-3xl">{letter.symbol || ""}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
