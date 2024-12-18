"use client"
import { selectCharacters } from "@/redux/selectors"
import { useSelector } from "react-redux"
import type { Character } from "@/redux/features/character/characterSlice"
import { Fragment } from "react"

export const Stats = ({ className }: { className?: string }) => {
  const characters = useSelector(selectCharacters)
  const hiragana = characters.filter(character => character.alphabet === "hiragana" && character.phoneme === "monograph" && character.modifier === "none")
  const groupedByGroup = hiragana.reduce<Character[][]>((acc, character) => {
    const group = character.group

    if (acc.length === 0) {
      acc.push([character])
      return acc
    }

    if (acc[acc.length - 1][0].group === group) {
      acc[acc.length - 1].push(character)
    } else {
      acc.push([character])
    }

    return acc
  }, [])

  return (
    <div className={"inline-block " + className}>
      <div className="flex gap-4">
        {groupedByGroup.reverse().map((group, groupIndex) => (
          <div key={`group-${groupIndex}`} className="flex flex-col gap-4">
            {group.map((character, i) => {
              const baseKey = `${character.group}-${character.symbol}-${i}`

              if (character.romanji === "n") {
                return (
                  <Fragment key={baseKey}>
                    <CharacterBlock character={character} />
                    <EmptyBlocks n={4} baseKey={baseKey} />
                  </Fragment>
                )
              }

              if (character.romanji === "wa") {
                return (
                  <Fragment key={baseKey}>
                    <CharacterBlock character={character} />
                    <EmptyBlocks n={3} baseKey={baseKey} />
                  </Fragment>
                )
              }

              if (character.romanji === "ya" || character.romanji === "yu") {
                return (
                  <Fragment key={baseKey}>
                    <CharacterBlock character={character} />
                    <EmptyBlocks n={1} baseKey={baseKey} />
                  </Fragment>
                )
              }

              return <CharacterBlock character={character} key={`${baseKey}-final`} />
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

const CharacterBlock = ({ character }: { character: Character }) => {
  return (
    <div className={`flex gap-4 items-center size-10 rounded-xl justify-center shadow transition-colors ${character.level < 20 ? "bg-level-1" : character.level < 40 ? "bg-level-2" : character.level < 60 ? "bg-level-3" : character.level < 80 ? "bg-level-4" : character.level <= 100 ? "bg-level-5" : "bg-level-1"}`}>
      <span>{character.symbol}</span>
    </div>
  )
}

const EmptyBlocks = ({ n, baseKey }: { n: number; baseKey: string }) => {
  return (
    <>
      {Array(n)
        .fill(null)
        .map((_, index) => (
          <div key={`${baseKey}-neutral-${index}`} className="flex gap-4 items-center size-10 rounded-xl justify-center bg-neutral shadow">
            <span> </span>
          </div>
        ))}
    </>
  )
}
