"use client"
import type { Character } from "@/redux/features/character/characterSlice"
import { selectCharacters, selectConfig } from "@/redux/selectors"
import { updateCharacter } from "@/redux/features/character/characterSlice"
import { store } from "@/redux/store"
import { groupCharactersBy } from "@/utils/groupCharactersBy"

const getCharacter = (): Character => {
  const state = store.getState()
  const characters: Character[] = selectCharacters(state)
  const config = selectConfig(state)

  // Filter selected characters
  const selectedCharacters = characters.filter(char => char.selected)
  const hiraganaSelectedCharacters = selectedCharacters.filter(char => char.alphabet === "hiragana")
  const katakanaSelectedCharacters = selectedCharacters.filter(char => char.alphabet === "katakana")

  // Group characters by learningOrder
  const hiraganaGroupedByLearningOrder = groupCharactersBy(hiraganaSelectedCharacters, "learningOrder")
  const katakanaGroupedByLearningOrder = groupCharactersBy(katakanaSelectedCharacters, "learningOrder")

  const completedLearningOrdersHiragana = new Set<number>()
  const completedLearningOrdersKatakana = new Set<number>()
  const notCompletedLearningOrdersHiragana = new Set<number>()
  const notCompletedLearningOrdersKatakana = new Set<number>()

  // Check for all selected characters if they meet the level requirement
  hiraganaGroupedByLearningOrder.forEach(learningGroup => {
    if (learningGroup.every(char => char.level >= config.levelToAchieveToAddNewCharacters)) {
      completedLearningOrdersHiragana.add(learningGroup[0].learningOrder)
    }
  })
  katakanaGroupedByLearningOrder.forEach(learningGroup => {
    if (learningGroup.every(char => char.level >= config.levelToAchieveToAddNewCharacters)) {
      completedLearningOrdersKatakana.add(learningGroup[0].learningOrder)
    }
  })

  // Add next learningOrder
  hiraganaGroupedByLearningOrder.forEach(group => {
    if (!completedLearningOrdersHiragana.has(group[0].learningOrder)) {
      notCompletedLearningOrdersHiragana.add(group[0].learningOrder)
    }
  })
  katakanaGroupedByLearningOrder.forEach(group => {
    if (!completedLearningOrdersKatakana.has(group[0].learningOrder)) {
      notCompletedLearningOrdersKatakana.add(group[0].learningOrder)
    }
  })

  const nextLearningOrderHiragana = Math.min(...Array.from(notCompletedLearningOrdersHiragana))
  const nextLearningOrderKatakana = Math.min(...Array.from(notCompletedLearningOrdersKatakana))

  // Add characters from the next learningOrder if the current ones are completed
  const charactersInThePool = config.addCharactersInProgression
    ? selectedCharacters.filter(char => {
        if (char.alphabet === "hiragana") {
          return char.learningOrder === nextLearningOrderHiragana || completedLearningOrdersHiragana.has(char.learningOrder)
        } else if (char.alphabet === "katakana") {
          return char.learningOrder === nextLearningOrderKatakana || completedLearningOrdersKatakana.has(char.learningOrder)
        }
        return false
      })
    : selectedCharacters

  // Creating a pool of characters to select from
  const pool: Character[] = charactersInThePool.flatMap(char => {
    if (char.cooldown > 0) return []
    return Array(char.weight).fill(char)
  }) // Multiply each character by its weight

  if (pool.length === 0) {
    console.error("No characters available")
  }

  const randomIndex = Math.floor(Math.random() * pool.length)
  const randomCharacter = pool[randomIndex]

  characters.forEach(char => {
    if (char.symbol === randomCharacter.symbol) {
      store.dispatch(updateCharacter({ character: { ...char, cooldown: Math.min(Math.max(0, charactersInThePool.length - 2), config.cooldown) } }))
    } else if (char.cooldown > 0) {
      store.dispatch(updateCharacter({ character: { ...char, cooldown: char.cooldown - 1 } }))
    }
  })

  return randomCharacter // Return a random character
}

export { getCharacter }
