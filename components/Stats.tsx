"use client"
import { selectCharacters } from "@/redux/selectors"
import { useSelector } from "react-redux"
import type { Character } from "@/redux/features/character/characterSlice"
import { Fragment, useState, useEffect } from "react"
import { CursorDropDown } from "@/components/CursorDropDown"
import { DropDown } from "@/components/DropDown"
import { ProgressBar } from "@/components/ProgressBar"
import { groupCharactersBy } from "@/utils/groupCharactersBy"

export const Stats = ({ className }: { className?: string }) => {
  const characters = useSelector(selectCharacters)
  const selectedCharacters = characters.filter(character => character.selected)
  const progress = selectedCharacters.reduce((acc, character) => acc + character.level, 0) / selectedCharacters.length

  return (
    <div className={className}>
      <DropDown title="Stats" subTitle={<ProgressBar fill={progress} />}>
        <div className="flex flex-wrap gap-14 mt-10 justify-evenly">
          <div>
            <h1 className="text-xl">Hiragana | ひらがな</h1>
            <h2>Gojūon | 五十音 | ごじゅうおん</h2>
            <Hiragana className="mt-10" />
          </div>
          <div>
            <h1 className="text-xl">Katakana | カタカナ</h1>
            <h2>Gojūon | 五十音 | ごじゅうおん</h2>
            <Katakana className="mt-10" />
          </div>
          <div>
            <h1 className="text-xl">Hiragana Dakuten | ひらがな濁点</h1>
            <h2>Gojūon | 五十音 | ごじゅうおん</h2>
            <HiraganaDakuten className="mt-10" />
          </div>
          <div>
            <h1 className="text-xl">Katakana Dakuten | カタカナ濁点</h1>
            <h2>Gojūon | 五十音 | ごじゅうおん</h2>
            <KatakanaDakuten className="mt-10" />
          </div>
          <div>
            <h1 className="text-xl">Hiragana | ひらがな</h1>
            <h2>Yōon | 拗音 | ようおん</h2>
            <HiraganaDigraph className="mt-10" />
          </div>
          <div>
            <h1 className="text-xl">Katakana | カタカナ</h1>
            <h2>Yōon | 拗音 | ようおん</h2>
            <KatakanaDigraph className="mt-10" />
          </div>
          <div>
            <h1 className="text-xl">Hiragana Dakuten | ひらがな濁点</h1>
            <h2>Yōon | 拗音 | ようおん</h2>
            <HiraganaDakutenDigraph className="mt-10" />
          </div>
          <div>
            <h1 className="text-xl">Katakana Dakuten | カタカナ濁点</h1>
            <h2>Yōon | 拗音 | ようおん</h2>
            <KatakanaDakutenDigraph className="mt-10" />
          </div>
        </div>
      </DropDown>
    </div>
  )
}

export const Hiragana = ({ className, onClick }: { className?: string; onClick?: (character: Character) => void }) => {
  const characters = useSelector(selectCharacters)
  const hiragana = characters.filter(character => character.alphabet === "hiragana" && character.phoneme === "monograph" && character.modifier === "none")

  return <Gojuuon className={className} characters={hiragana} onClick={onClick} />
}

export const Katakana = ({ className, onClick }: { className?: string; onClick?: (character: Character) => void }) => {
  const characters = useSelector(selectCharacters)
  const katakana = characters.filter(character => character.alphabet === "katakana" && character.phoneme === "monograph" && character.modifier === "none")

  return <Gojuuon onClick={onClick} className={className} characters={katakana} />
}

export const HiraganaDakuten = ({ className, onClick }: { className?: string; onClick?: (character: Character) => void }) => {
  const characters = useSelector(selectCharacters)
  const hiraganaDakuten = characters.filter(character => character.alphabet === "hiragana" && character.phoneme === "monograph" && (character.modifier === "dakuten" || character.modifier === "handakuten"))

  return <GridByGroup onClick={onClick} className={className} characters={hiraganaDakuten} />
}

export const KatakanaDakuten = ({ className, onClick }: { className?: string; onClick?: (character: Character) => void }) => {
  const characters = useSelector(selectCharacters)
  const katakanaDakuten = characters.filter(character => character.alphabet === "katakana" && character.phoneme === "monograph" && (character.modifier === "dakuten" || character.modifier === "handakuten"))

  return <GridByGroup onClick={onClick} className={className} characters={katakanaDakuten} />
}

export const HiraganaDigraph = ({ className, onClick }: { className?: string; onClick?: (character: Character) => void }) => {
  const characters = useSelector(selectCharacters)
  const hiraganaDigraph = characters.filter(character => character.alphabet === "hiragana" && character.phoneme === "digraph" && character.modifier === "none")

  return <GridByGroup onClick={onClick} className={className} characters={hiraganaDigraph} />
}

export const KatakanaDigraph = ({ className, onClick }: { className?: string; onClick?: (character: Character) => void }) => {
  const characters = useSelector(selectCharacters)
  const katakanaDigraph = characters.filter(character => character.alphabet === "katakana" && character.phoneme === "digraph" && character.modifier === "none")

  return <GridByGroup onClick={onClick} className={className} characters={katakanaDigraph} />
}

export const HiraganaDakutenDigraph = ({ className, onClick }: { className?: string; onClick?: (character: Character) => void }) => {
  const characters = useSelector(selectCharacters)
  const hiraganaDakutenDigraph = characters.filter(character => character.alphabet === "hiragana" && character.phoneme === "digraph" && (character.modifier === "dakuten" || character.modifier === "handakuten"))

  return <GridByGroup onClick={onClick} className={className} characters={hiraganaDakutenDigraph} />
}

export const KatakanaDakutenDigraph = ({ className, onClick }: { className?: string; onClick?: (character: Character) => void }) => {
  const characters = useSelector(selectCharacters)
  const katakanaDakutenDigraph = characters.filter(character => character.alphabet === "katakana" && character.phoneme === "digraph" && (character.modifier === "dakuten" || character.modifier === "handakuten"))

  return <GridByGroup onClick={onClick} className={className} characters={katakanaDakutenDigraph} />
}

export const Gojuuon = ({ characters, className, onClick }: { characters: Character[]; className?: string; onClick?: (character: Character) => void }) => {
  const groupedByGroup = groupCharactersBy(characters, "group")

  return (
    <div className={"inline-block " + className}>
      <div className="flex flex-col-reverse md:flex-row gap-4">
        {groupedByGroup.reverse().map((group, groupIndex) => (
          <div key={`group-${groupIndex}`} className="flex flex-row-reverse md:flex-col gap-4">
            {group.map((character, i) => {
              const baseKey = `${character.group}-${character.symbol}-${i}`

              if (character.romanji === "n") {
                return (
                  <Fragment key={baseKey}>
                    <CharacterBlock onClick={onClick} character={character} />
                    <EmptyBlocks n={4} baseKey={baseKey} />
                  </Fragment>
                )
              }

              if (character.romanji === "wa") {
                return (
                  <Fragment key={baseKey}>
                    <CharacterBlock onClick={onClick} character={character} />
                    <EmptyBlocks n={3} baseKey={baseKey} />
                  </Fragment>
                )
              }

              if (character.romanji === "ya" || character.romanji === "yu") {
                return (
                  <Fragment key={baseKey}>
                    <CharacterBlock onClick={onClick} character={character} />
                    <EmptyBlocks n={1} baseKey={baseKey} />
                  </Fragment>
                )
              }

              return <CharacterBlock onClick={onClick} character={character} key={`${baseKey}-final`} />
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export const GridByGroup = ({ characters, className, onClick }: { characters: Character[]; className?: string; onClick?: (character: Character) => void }) => {
  const groupedByGroup = groupCharactersBy(characters, "group")

  return (
    <div className={"inline-block " + className}>
      <div className="flex flex-row gap-4">
        {groupedByGroup.reverse().map((group, groupIndex) => (
          <div key={`group-${groupIndex}`} className="flex flex-col gap-4">
            {group.map((character, i) => {
              const baseKey = `${character.group}-${character.symbol}-${i}`

              return <CharacterBlock onClick={onClick} character={character} key={`${baseKey}-final`} />
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export const CharacterBlock = ({ character, onClick }: { character: Character; onClick?: (character: Character) => void }) => {
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
        onClick={() => {
          if (onClick) {
            onClick(character)
          }
        }}
        onMouseEnter={() => {
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
        }}
        className={`flex gap-4 items-center size-10 rounded-xl justify-center shadow transition-all relative ${character.selected ? "border border-primary" : ""} ${isExpanded ? "scale-125" : ""} ${character.level < 20 ? "bg-level-1" : character.level < 40 ? "bg-level-2" : character.level < 60 ? "bg-level-3" : character.level < 80 ? "bg-level-4" : character.level <= 100 ? "bg-level-5" : "bg-level-1"}`}
      >
        <span style={{ pointerEvents: "none" }} className={`select-none ${character.selected ? "text-black" : "text-passive"}`}>
          {character.symbol}
        </span>
      </div>
    </CursorDropDown>
  )
}

export const DropdownContent = ({ character }: { character: Character }) => {
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

export const EmptyBlocks = ({ n, baseKey }: { n: number; baseKey: string }) => {
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
