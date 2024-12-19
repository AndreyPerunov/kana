"use client"
import { RootState } from "./store"

//selectors
export const selectCharacters = (state: RootState) => state.characters
export const selectConfig = (state: RootState) => state.config
