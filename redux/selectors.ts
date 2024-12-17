"use client"
import { createSelector } from "reselect"
import { RootState } from "./store"

//selectors
const selectPureCharacters = (state: RootState) => state.characters
export const selectConfig = (state: RootState) => state.config
export const selectCharacters = createSelector([selectPureCharacters, selectConfig], (characters, config) => {
  if (!config.addCharactersInProgression) {
    return characters.map(character => ({
      ...character,
      weight: 50
    }))
  } else {
    return characters
  }
})
