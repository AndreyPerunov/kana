"use client"
import { InfiniteRoulette } from "@/components/InfiniteRoulette"
import { RouletteInput } from "@/components/RouletteInput"
import { useReducer, useEffect } from "react"
import { getCharacter } from "@/utils/getCharacter"
import { useSelector, useDispatch } from "react-redux"
import type { Character } from "@/redux/features/character/characterSlice"
import { selectConfig } from "@/redux/selectors"
import { updateCharacterScore } from "@/redux/features/character/characterSlice"

const enum reducerActionType {
  NEXT,
  START_ROLL,
  END_ROLL,
  ADD_CHARACTER
}

interface Action {
  type: reducerActionType
  character?: Character
  correct?: boolean
}

interface State {
  learned: ((Character & { correct: boolean }) | " ")[]
  current: Character[]
  toLearn: Character[]
  isSliding: boolean
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case reducerActionType.NEXT:
      if (state.toLearn.length === 0) {
        console.error("No more characters to learn")
        return state
      }
      return {
        learned: [...state.learned.slice(0, -1), { ...state.current[0], correct: action.correct ?? false }, " "], // [a, b, c, " "] => [a, b, c, d " "]
        current: [state.toLearn[0]], // [d] => [e]
        toLearn: state.toLearn.slice(1), // [e, f, g] => [f, g]
        isSliding: false
      }

    case reducerActionType.START_ROLL:
      if (state.toLearn.length === 0) {
        console.error("No more characters to learn")
        return state
      }
      return {
        learned: [...state.learned.slice(0, -1), { ...state.current[0], correct: action.correct ?? false }], // [a, b, c, " "] => [a, b, c, d]
        current: [...state.current, state.toLearn[0]], // [d] => [d, e]
        toLearn: [...state.toLearn], // [e, f, g] => [e, f, g]
        isSliding: true // start sliding animation
      }

    case reducerActionType.END_ROLL:
      return {
        learned: [...state.learned, " "], // [a, b, c, d, " "] => [a, b, c, d, " "]
        current: state.current.slice(1), // [d, e] => [e]
        toLearn: state.toLearn.slice(1), // [e, f, g] => [f, g]
        isSliding: false
      }

    case reducerActionType.ADD_CHARACTER:
      if (!action.character) {
        console.error("Character is not provided")
        return state
      }
      if (state.current.length > 0) {
        return {
          learned: state.learned,
          current: state.current,
          toLearn: [...state.toLearn, action.character],
          isSliding: false
        }
      } else {
        return {
          learned: state.learned,
          current: [action.character],
          toLearn: state.toLearn,
          isSliding: false
        }
      }

    default:
      return state
  }
}

export const RouletteControls = ({ className }: { className?: string }) => {
  const config = useSelector(selectConfig)
  const reduxDispatch = useDispatch()

  const [state, dispatch] = useReducer(reducer, {
    learned: [" "], // always start with a space. It is behind the current character
    current: [], // current character that user guesses
    toLearn: [], // characters that user will learn
    isSliding: false
  })

  // Initialize the first 10 characters
  useEffect(() => {
    for (let i = 0; i < 8; i++) {
      // artificial delay
      setTimeout(() => {
        const character = getCharacter()
        dispatch({ type: reducerActionType.ADD_CHARACTER, character })
      }, 50 * i)
    }
  }, [])

  const submitHandler = (userAnswer: string) => {
    // Prevent multiple clicks
    if (state.isSliding) return

    // Add character to the end of the list
    const character = getCharacter()
    dispatch({ type: reducerActionType.ADD_CHARACTER, character })

    if (!config.slideAnimation) {
      // If slide animation is disabled
      // move to the next character immediately
      dispatch({ type: reducerActionType.NEXT, correct: userAnswer === state.current[0].romanji })
    } else {
      // Start sliding animation
      dispatch({ type: reducerActionType.START_ROLL, correct: userAnswer === state.current[0].romanji })
    }
    if (!state.current[0]) {
      console.error("No character is provided")
      return
    }

    // Update character score
    reduxDispatch(updateCharacterScore({ character: state.current[0], correct: userAnswer === state.current[0].romanji, config }))
  }

  return (
    <div className={"flex flex-col items-center " + className}>
      <InfiniteRoulette learned={state.learned} current={state.current} toLearn={state.toLearn} isSliding={state.isSliding} animationEnd={() => dispatch({ type: reducerActionType.END_ROLL })} duration={config.animationDuration} />
      <RouletteInput onSubmit={submitHandler} currentCharacter={state.current[0]} disabled={state.isSliding} />
    </div>
  )
}
