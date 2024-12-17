"use client"
import { configureStore } from "@reduxjs/toolkit"
import charactersReducer from "./features/character/characterSlice"
import configReducer from "./features/config/configSlice"

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    config: configReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
