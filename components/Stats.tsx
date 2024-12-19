"use client"
import { selectCharacters } from "@/redux/selectors"
import { useSelector } from "react-redux"
import type { Character } from "@/redux/features/character/characterSlice"
import { Fragment, useState, useEffect } from "react"
import { CursorDropDown } from "@/components/CursorDropDown"
import { DropDown } from "@/components/DropDown"
import { ProgressBar } from "@/components/ProgressBar"

export const Stats = ({ className }: { className?: string }) => {
  const characters = useSelector(selectCharacters)
  const selectedCharacters = characters.filter(character => character.selected)
  const progress = selectedCharacters.reduce((acc, character) => acc + character.level, 0) / selectedCharacters.length

  return (
    <div className={className}>
      <DropDown title="Stats" subTitle={<ProgressBar fill={progress} />} className="mt-10">
        <div>
          <h1 className="text-xl">Hiragana | ひらがな</h1>
          <h2>Gojūon | 五十音 | ごじゅうおん</h2>
          <Hiragana className="mt-10" />
        </div>
      </DropDown>
      <h1 className="mt-10 text-2xl flex items-center text-passive">Master Japanese Kana effortlessly! Every guess helps you improve, bringing you closer to fluency. Using the Spaced Repetition system, it helps you focus on what needs practice making your journey fun and effective. Note that short daily sessions are more effective than trying to learn everything at once!</h1>
    </div>
  )
}

const Hiragana = ({ className }: { className?: string }) => {
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
      <div className="flex flex-col-reverse sm:flex-row gap-4">
        {groupedByGroup.reverse().map((group, groupIndex) => (
          <div key={`group-${groupIndex}`} className="flex flex-row-reverse sm:flex-col gap-4">
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
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  // hover effect with delay
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isHovered) {
      timer = setTimeout(() => {
        setIsExpanded(true)
      }, 500)
    } else {
      setIsExpanded(false)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [isHovered])

  return (
    <CursorDropDown xOffset={20} yOffset={20} isExpanded={isExpanded} content={<DropdownContent character={character} />}>
      <div
        onMouseEnter={() => {
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
        }}
        className={`flex gap-4 items-center size-10 rounded-xl justify-center shadow transition-all relative ${character.selected ? "border border-primary" : ""} ${isExpanded ? "scale-125" : ""} ${character.level < 20 ? "bg-level-1" : character.level < 40 ? "bg-level-2" : character.level < 60 ? "bg-level-3" : character.level < 80 ? "bg-level-4" : character.level <= 100 ? "bg-level-5" : "bg-level-1"}`}
      >
        <span style={{ pointerEvents: "none" }} className={character.selected ? "text-black" : "text-passive"}>
          {character.symbol}
        </span>
      </div>
    </CursorDropDown>
  )
}

const DropdownContent = ({ character }: { character: Character }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-8">
        <span>Symbol:</span>
        <span>{character.symbol}</span>
      </div>
      <div className="flex justify-between items-center gap-8">
        <span>Romanji:</span>
        <span>{character.romanji}</span>
      </div>
      <div className="flex justify-between items-center gap-8">
        <span>Knowledge:</span>
        <span>{character.level}%</span>
      </div>
      <div className="flex justify-between items-center gap-8">
        <span>Frequency:</span>
        <span>{character.weight}%</span>
      </div>
      <div className="flex justify-between items-center gap-8">
        <span>Cooldown:</span>
        <span>{character.cooldown}</span>
      </div>
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
