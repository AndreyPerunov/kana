"use client"

import { Provider } from "react-redux"
import { store } from "./store"
import { useEffect } from "react"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load state from local storage
    const savedConfig = localStorage.getItem("config")
    const savedCharacters = localStorage.getItem("characters")
    if (savedConfig || savedCharacters) {
      store.dispatch({
        type: "config/loadState",
        payload: savedConfig ? JSON.parse(savedConfig) : undefined
      })
      store.dispatch({
        type: "characters/loadState",
        payload: savedCharacters ? JSON.parse(savedCharacters) : undefined
      })
    }

    // Save state to local storage
    window.onbeforeunload = () => {
      const { config, characters } = store.getState()
      localStorage.setItem("config", JSON.stringify(config))
      localStorage.setItem("characters", JSON.stringify(characters))
    }
  }, [])

  return <Provider store={store}>{children}</Provider>
}
