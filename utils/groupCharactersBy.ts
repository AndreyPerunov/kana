import type { Character } from "@/redux/features/character/characterSlice"

export const groupCharactersBy = (characters: Character[], key: keyof Character) => {
  return characters.reduce<Character[][]>((acc, character) => {
    const currentKeyValue = character[key]

    if (acc.length === 0) {
      acc.push([character])
      return acc
    }

    if (acc[acc.length - 1][0][key] === currentKeyValue) {
      acc[acc.length - 1].push(character)
    } else {
      acc.push([character])
    }

    return acc
  }, [])
}
