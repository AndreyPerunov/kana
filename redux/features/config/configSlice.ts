"use client"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  slideAnimation: true,
  animationDuration: 200,
  // UpdateCharacter
  addCharactersInProgression: true,
  levelToAchieveToAddNewCharacters: 20,
  cooldown: 4,

  // Input
  submitOnRightAnswer: false
}

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    updateConfig(state, action) {
      return { ...state, ...action.payload }
    }
  }
})

export const { updateConfig } = configSlice.actions
export default configSlice.reducer
