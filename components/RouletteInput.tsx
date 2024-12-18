"use client"
import { useState } from "react"
import type { Character } from "@/redux/features/character/characterSlice"
import { useSelector } from "react-redux"
import { selectConfig } from "@/redux/selectors"

interface RouletteInputProps {
  onSubmit: (userAnswer: string) => void
  disabled?: boolean
  currentCharacter?: Character
}

export const RouletteInput = ({ onSubmit, disabled = false, currentCharacter }: RouletteInputProps) => {
  const config = useSelector(selectConfig)
  const [value, setValue] = useState("")
  const allowedCharacters = "abcdefghijklmnopqrstuvwxyz"

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit to 5 characters
    if (e.target.value.length > 5) return

    // Limit to allowed characters
    if (
      e.target.value
        .toLowerCase()
        .split("")
        .some(char => !allowedCharacters.includes(char))
    )
      return

    if (currentCharacter && e.target.value.trim().toLowerCase() === currentCharacter.romanji && !disabled && config.submitOnRightAnswer) {
      onSubmit(e.target.value.trim().toLowerCase())
      setValue("")
    } else {
      setValue(e.target.value)
    }
  }

  return (
    <input
      autoFocus
      type="text"
      className="mt-7 h-16 w-96 bg-white rounded-xl text-center text-passive text-2xl outline-none shadow"
      value={value}
      onChange={onChangeHandler}
      placeholder="How does it spell?"
      onKeyDown={e => {
        if (disabled) return
        if (e.key === "Enter" && value.trim().length > 0) {
          onSubmit(value.trim().toLowerCase())
          setValue("")
        }
      }}
    />
  )
}
