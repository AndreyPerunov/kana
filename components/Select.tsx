"use client"
import { Hiragana, Katakana, HiraganaDakuten, KatakanaDakuten, HiraganaDigraph, KatakanaDigraph, HiraganaDakutenDigraph, KatakanaDakutenDigraph } from "@/components/Stats"
import { Character } from "@/redux/features/character/characterSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateCharacter } from "@/redux/features/character/characterSlice"

// TODO: Select characters based on filters
// TODO: Select whole groups of characters

export const Select = ({ className }: { className?: string }) => {
  const [all, setAll] = useState(false)
  const [hiragana, setHiragana] = useState(true)
  const [katakana, setKatakana] = useState(true)
  const [dakuten, setDakuten] = useState(false)
  const [digraph, setDigraph] = useState(false)
  const dispatch = useDispatch()

  const clickHandler = (character: Character) => {
    dispatch(
      updateCharacter({
        character: {
          ...character,
          selected: !character.selected
        }
      })
    )
  }

  const allFilterClickHandler = () => {
    if (!all) {
      setHiragana(true)
      setKatakana(true)
      setDakuten(true)
      setDigraph(true)
      setAll(true)
    }
  }

  useEffect(() => {
    if (!hiragana || !katakana || !dakuten || !digraph) {
      setAll(false)
    }
    if (hiragana && katakana && dakuten && digraph) {
      setAll(true)
    }
  }, [hiragana, katakana, dakuten, digraph])

  return (
    <div className={"mb-20 " + className}>
      <div>
        <h1 className="text-2xl">Filters: </h1>
        <div className="flex gap-4 mt-4">
          <Filter onClick={allFilterClickHandler} value={all} label="All Characters" />
        </div>
        <div className="flex gap-4 mt-4">
          <Filter
            onClick={() => {
              if (katakana) {
                setHiragana(prev => !prev)
              }
            }}
            value={hiragana}
            label="Hiragana"
          />
          <Filter
            onClick={() => {
              if (hiragana) {
                setKatakana(prev => !prev)
              }
            }}
            value={katakana}
            label="Katakana"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <Filter onClick={() => setDakuten(prev => !prev)} value={dakuten} label="Dakuten & Handakuten" />
          <Filter onClick={() => setDigraph(prev => !prev)} value={digraph} label="Digraph" />
        </div>
      </div>
      <div className="flex flex-wrap gap-14 justify-evenly mt-8">
        {hiragana && (
          <div>
            <h1 className="text-xl">Hiragana | ひらがな</h1>
            <h2>Gojūon | 五十音 | ごじゅうおん</h2>
            <Hiragana onClick={clickHandler} className="mt-10" />
          </div>
        )}
        {katakana && (
          <div>
            <h1 className="text-xl">Katakana | カタカナ</h1>
            <h2>Gojūon | 五十音 | ごじゅうおん</h2>
            <Katakana onClick={clickHandler} className="mt-10" />
          </div>
        )}
        {dakuten && hiragana && (
          <div>
            <h1 className="text-xl">Hiragana Dakuten | ひらがな濁点</h1>
            <h2>Gojūon | 五十音 | ごじゅうおん</h2>
            <HiraganaDakuten onClick={clickHandler} className="mt-10" />
          </div>
        )}
        {dakuten && katakana && (
          <div>
            <h1 className="text-xl">Katakana Dakuten | カタカナ濁点</h1>
            <h2>Gojūon | 五十音 | ごじゅうおん</h2>
            <KatakanaDakuten onClick={clickHandler} className="mt-10" />
          </div>
        )}
        {digraph && hiragana && (
          <div>
            <h1 className="text-xl">Hiragana | ひらがな</h1>
            <h2>Yōon | 拗音 | ようおん</h2>
            <HiraganaDigraph onClick={clickHandler} className="mt-10" />
          </div>
        )}
        {digraph && katakana && (
          <div>
            <h1 className="text-xl">Katakana | カタカナ</h1>
            <h2>Yōon | 拗音 | ようおん</h2>
            <KatakanaDigraph onClick={clickHandler} className="mt-10" />
          </div>
        )}
        {digraph && dakuten && hiragana && (
          <div>
            <h1 className="text-xl">Hiragana Dakuten | ひらがな濁点</h1>
            <h2>Yōon | 拗音 | ようおん</h2>
            <HiraganaDakutenDigraph onClick={clickHandler} className="mt-10" />
          </div>
        )}
        {digraph && dakuten && katakana && (
          <div>
            <h1 className="text-xl">Katakana Dakuten | カタカナ濁点</h1>
            <h2>Yōon | 拗音 | ようおん</h2>
            <KatakanaDakutenDigraph onClick={clickHandler} className="mt-10" />
          </div>
        )}
      </div>
    </div>
  )
}

const Filter = ({ className, value, onClick, label }: { className?: string; value: boolean; onClick: () => void; label: string }) => {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 justify-center rounded-xl py-2 px-4 shadow ${value ? "bg-primary text-white" : "bg-white text-passive"} ${className}`}>
      {label}
    </button>
  )
}
