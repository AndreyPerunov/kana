"use client"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  slideAnimation: true, //TODO ERROR
  animationDuration: 200,
  // UpdateCharacter
  addCharactersInProgression: true,
  levelToAchieveToAddNewCharacters: 20
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
