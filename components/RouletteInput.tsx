"use client"
import { FormEventHandler, useState } from "react"

interface RouletteInputProps {
  onSubmit: FormEventHandler<HTMLInputElement>
  disabled?: boolean
}

export const RouletteInput = ({ onSubmit, disabled = false }: RouletteInputProps) => {
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

    setValue(e.target.value)
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
          onSubmit(e)
          setValue("")
        }
      }}
    />
  )
}
