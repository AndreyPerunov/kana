"use client"
import type { Character } from "@/redux/features/character/characterSlice"
import { selectCharacters } from "@/redux/selectors"
import { updateCharacter } from "@/redux/features/character/characterSlice"
import { store } from "@/redux/store"

const getCharacter = (): Character => {
  const state = store.getState()
  const characters: Character[] = selectCharacters(state)

  // TODO: Align with selected characters settings
  // TODO: Prevent the issue if low amount of characters are selected do not use cooldown
  const pool: Character[] = characters.flatMap(char => {
    if (char.cooldown > 0) return []
    if (char.selected === false) return []
    return Array(char.weight).fill(char)
  }) // Multiply each character by its weight

  if (pool.length === 0) {
    console.error("No characters available")
  }

  const randomIndex = Math.floor(Math.random() * pool.length)
  const selectedCharacter = pool[randomIndex]

  characters.forEach(char => {
    if (char.symbol === selectedCharacter.symbol) {
      store.dispatch(updateCharacter({ character: { ...char, cooldown: 4 } }))
    } else if (char.cooldown > 0) {
      store.dispatch(updateCharacter({ character: { ...char, cooldown: char.cooldown - 1 } }))
    }
  })

  return selectedCharacter // Return a random character
}

export { getCharacter }
