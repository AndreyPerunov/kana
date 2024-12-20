"use client"
import { createSlice } from "@reduxjs/toolkit"

export type Character = {
  symbol: string
  romanji: string
  level: number // Knowledge level from 0 to 100
  weight: number // Determines frequency in the selection pool (0-100)
  streak: number // Number of correct answers in a row
  cooldown: number // Prevents the character from appearing too often
  alphabet: "hiragana" | "katakana" // Hiragana or Katakana
  phoneme: "monograph" | "digraph" // Monograph or Digraph
  modifier: "none" | "dakuten" | "handakuten" // None, Dakuten or Handakuten
  group: "" | "k" | "s" | "t" | "n" | "h" | "m" | "y" | "r" | "w" | "special" | "g" | "z" | "d" | "b" | "p" // to which character group it belongs
  learningOrder: number
  selected: boolean
}

const initialState: Character[] = [
  { symbol: "あ", romanji: "a", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "", learningOrder: 0, selected: true },
  { symbol: "い", romanji: "i", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "", learningOrder: 0, selected: true },
  { symbol: "う", romanji: "u", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "", learningOrder: 0, selected: true },
  { symbol: "え", romanji: "e", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "", learningOrder: 0, selected: true },
  { symbol: "お", romanji: "o", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "", learningOrder: 0, selected: true },

  // K group
  { symbol: "か", romanji: "ka", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "k", learningOrder: 1, selected: true },
  { symbol: "き", romanji: "ki", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "k", learningOrder: 1, selected: true },
  { symbol: "く", romanji: "ku", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "k", learningOrder: 1, selected: true },
  { symbol: "け", romanji: "ke", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "k", learningOrder: 1, selected: true },
  { symbol: "こ", romanji: "ko", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "k", learningOrder: 1, selected: true },

  // S group
  { symbol: "さ", romanji: "sa", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "s", learningOrder: 2, selected: true },
  { symbol: "し", romanji: "shi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "s", learningOrder: 2, selected: true },
  { symbol: "す", romanji: "su", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "s", learningOrder: 2, selected: true },
  { symbol: "せ", romanji: "se", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "s", learningOrder: 2, selected: true },
  { symbol: "そ", romanji: "so", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "s", learningOrder: 2, selected: true },

  // T group
  { symbol: "た", romanji: "ta", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "t", learningOrder: 3, selected: true },
  { symbol: "ち", romanji: "chi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "t", learningOrder: 3, selected: true },
  { symbol: "つ", romanji: "tsu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "t", learningOrder: 3, selected: true },
  { symbol: "て", romanji: "te", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "t", learningOrder: 3, selected: true },
  { symbol: "と", romanji: "to", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "t", learningOrder: 3, selected: true },

  // N group
  { symbol: "な", romanji: "na", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "n", learningOrder: 4, selected: true },
  { symbol: "に", romanji: "ni", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "n", learningOrder: 4, selected: true },
  { symbol: "ぬ", romanji: "nu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "n", learningOrder: 4, selected: true },
  { symbol: "ね", romanji: "ne", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "n", learningOrder: 4, selected: true },
  { symbol: "の", romanji: "no", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "n", learningOrder: 4, selected: true },

  // H group
  { symbol: "は", romanji: "ha", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "h", learningOrder: 5, selected: true },
  { symbol: "ひ", romanji: "hi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "h", learningOrder: 5, selected: true },
  { symbol: "ふ", romanji: "fu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "h", learningOrder: 5, selected: true },
  { symbol: "へ", romanji: "he", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "h", learningOrder: 5, selected: true },
  { symbol: "ほ", romanji: "ho", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "h", learningOrder: 5, selected: true },

  // M group
  { symbol: "ま", romanji: "ma", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "m", learningOrder: 6, selected: true },
  { symbol: "み", romanji: "mi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "m", learningOrder: 6, selected: true },
  { symbol: "む", romanji: "mu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "m", learningOrder: 6, selected: true },
  { symbol: "め", romanji: "me", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "m", learningOrder: 6, selected: true },
  { symbol: "も", romanji: "mo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "m", learningOrder: 6, selected: true },

  // Y group
  { symbol: "や", romanji: "ya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "y", learningOrder: 7, selected: true },
  { symbol: "ゆ", romanji: "yu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "y", learningOrder: 7, selected: true },
  { symbol: "よ", romanji: "yo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "y", learningOrder: 7, selected: true },

  // R group
  { symbol: "ら", romanji: "ra", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "r", learningOrder: 8, selected: true },
  { symbol: "り", romanji: "ri", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "r", learningOrder: 8, selected: true },
  { symbol: "る", romanji: "ru", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "r", learningOrder: 8, selected: true },
  { symbol: "れ", romanji: "re", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "r", learningOrder: 8, selected: true },
  { symbol: "ろ", romanji: "ro", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "r", learningOrder: 8, selected: true },

  // W group
  { symbol: "わ", romanji: "wa", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "w", learningOrder: 9, selected: true },
  { symbol: "を", romanji: "wo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "w", learningOrder: 9, selected: true },

  // N group
  { symbol: "ん", romanji: "n", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "none", group: "special", learningOrder: 10, selected: true },

  // Dakuten
  // G group
  { symbol: "が", romanji: "ga", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "g", learningOrder: 11, selected: false },
  { symbol: "ぎ", romanji: "gi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "g", learningOrder: 11, selected: false },
  { symbol: "ぐ", romanji: "gu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "g", learningOrder: 11, selected: false },
  { symbol: "げ", romanji: "ge", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "g", learningOrder: 11, selected: false },
  { symbol: "ご", romanji: "go", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "g", learningOrder: 11, selected: false },

  // Z group
  { symbol: "ざ", romanji: "za", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "z", learningOrder: 12, selected: false },
  { symbol: "じ", romanji: "ji", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "z", learningOrder: 12, selected: false },
  { symbol: "ず", romanji: "zu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "z", learningOrder: 12, selected: false },
  { symbol: "ぜ", romanji: "ze", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "z", learningOrder: 12, selected: false },
  { symbol: "ぞ", romanji: "zo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "z", learningOrder: 12, selected: false },

  // D group
  { symbol: "だ", romanji: "da", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "d", learningOrder: 13, selected: false },
  { symbol: "ぢ", romanji: "ji", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "d", learningOrder: 13, selected: false },
  { symbol: "づ", romanji: "zu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "d", learningOrder: 13, selected: false },
  { symbol: "で", romanji: "de", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "d", learningOrder: 13, selected: false },
  { symbol: "ど", romanji: "do", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "d", learningOrder: 13, selected: false },

  // B group
  { symbol: "ば", romanji: "ba", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "b", learningOrder: 14, selected: false },
  { symbol: "び", romanji: "bi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "b", learningOrder: 14, selected: false },
  { symbol: "ぶ", romanji: "bu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "b", learningOrder: 14, selected: false },
  { symbol: "べ", romanji: "be", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "b", learningOrder: 14, selected: false },
  { symbol: "ぼ", romanji: "bo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "dakuten", group: "b", learningOrder: 14, selected: false },

  // Handakuten
  // P group
  { symbol: "ぱ", romanji: "pa", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "handakuten", group: "p", learningOrder: 15, selected: false },
  { symbol: "ぴ", romanji: "pi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "handakuten", group: "p", learningOrder: 15, selected: false },
  { symbol: "ぷ", romanji: "pu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "handakuten", group: "p", learningOrder: 15, selected: false },
  { symbol: "ぺ", romanji: "pe", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "handakuten", group: "p", learningOrder: 15, selected: false },
  { symbol: "ぽ", romanji: "po", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "monograph", modifier: "handakuten", group: "p", learningOrder: 15, selected: false },

  // Digraphs
  // K group
  { symbol: "きゃ", romanji: "kya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "k", learningOrder: 16, selected: false },
  { symbol: "きゅ", romanji: "kyu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "k", learningOrder: 16, selected: false },
  { symbol: "きょ", romanji: "kyo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "k", learningOrder: 16, selected: false },

  // S group
  { symbol: "しゃ", romanji: "sha", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "s", learningOrder: 17, selected: false },
  { symbol: "しゅ", romanji: "shu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "s", learningOrder: 17, selected: false },
  { symbol: "しょ", romanji: "sho", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "s", learningOrder: 17, selected: false },

  // T group
  { symbol: "ちゃ", romanji: "cha", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "t", learningOrder: 18, selected: false },
  { symbol: "ちゅ", romanji: "chu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "t", learningOrder: 18, selected: false },
  { symbol: "ちょ", romanji: "cho", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "t", learningOrder: 18, selected: false },

  // N group
  { symbol: "にゃ", romanji: "nya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "n", learningOrder: 19, selected: false },
  { symbol: "にゅ", romanji: "nyu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "n", learningOrder: 19, selected: false },
  { symbol: "にょ", romanji: "nyo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "n", learningOrder: 19, selected: false },

  // H group
  { symbol: "ひゃ", romanji: "hya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "h", learningOrder: 20, selected: false },
  { symbol: "ひゅ", romanji: "hyu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "h", learningOrder: 20, selected: false },
  { symbol: "ひょ", romanji: "hyo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "h", learningOrder: 20, selected: false },

  // M group
  { symbol: "みゃ", romanji: "mya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "m", learningOrder: 21, selected: false },
  { symbol: "みゅ", romanji: "myu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "m", learningOrder: 21, selected: false },
  { symbol: "みょ", romanji: "myo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "m", learningOrder: 21, selected: false },

  // R group
  { symbol: "りゃ", romanji: "rya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "r", learningOrder: 22, selected: false },
  { symbol: "りゅ", romanji: "ryu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "r", learningOrder: 22, selected: false },
  { symbol: "りょ", romanji: "ryo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "none", group: "r", learningOrder: 22, selected: false },

  // Dakuten & Digraphs
  // G group
  { symbol: "ぎゃ", romanji: "gya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "dakuten", group: "g", learningOrder: 23, selected: false },
  { symbol: "ぎゅ", romanji: "gyu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "dakuten", group: "g", learningOrder: 23, selected: false },
  { symbol: "ぎょ", romanji: "gyo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "dakuten", group: "g", learningOrder: 23, selected: false },

  // Z group
  { symbol: "じゃ", romanji: "ja", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "dakuten", group: "z", learningOrder: 24, selected: false },
  { symbol: "じゅ", romanji: "ju", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "dakuten", group: "z", learningOrder: 24, selected: false },
  { symbol: "じょ", romanji: "jo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "dakuten", group: "z", learningOrder: 24, selected: false },

  // D group
  { symbol: "ざゃ", romanji: "ja", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "dakuten", group: "d", learningOrder: 25, selected: false },
  { symbol: "ざゅ", romanji: "ju", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "dakuten", group: "d", learningOrder: 25, selected: false },
  { symbol: "ざょ", romanji: "jo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "dakuten", group: "d", learningOrder: 25, selected: false },

  // B group
  { symbol: "びゃ", romanji: "bya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "dakuten", group: "b", learningOrder: 26, selected: false },
  { symbol: "びゅ", romanji: "byu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "dakuten", group: "b", learningOrder: 26, selected: false },
  { symbol: "びょ", romanji: "byo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "dakuten", group: "b", learningOrder: 26, selected: false },

  // Handakuten & Digraphs
  // P group
  { symbol: "ぴゃ", romanji: "pya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "handakuten", group: "p", learningOrder: 27, selected: false },
  { symbol: "ぴゅ", romanji: "pyu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "handakuten", group: "p", learningOrder: 27, selected: false },
  { symbol: "ぴょ", romanji: "pyo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "hiragana", phoneme: "digraph", modifier: "handakuten", group: "p", learningOrder: 27, selected: false },

  // Katakana
  { symbol: "ア", romanji: "a", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "", learningOrder: 0, selected: false },
  { symbol: "イ", romanji: "i", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "", learningOrder: 0, selected: false },
  { symbol: "ウ", romanji: "u", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "", learningOrder: 0, selected: false },
  { symbol: "エ", romanji: "e", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "", learningOrder: 0, selected: false },
  { symbol: "オ", romanji: "o", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "", learningOrder: 0, selected: false },

  // K-group
  { symbol: "カ", romanji: "ka", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "k", learningOrder: 1, selected: false },
  { symbol: "キ", romanji: "ki", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "k", learningOrder: 1, selected: false },
  { symbol: "ク", romanji: "ku", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "k", learningOrder: 1, selected: false },
  { symbol: "ケ", romanji: "ke", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "k", learningOrder: 1, selected: false },
  { symbol: "コ", romanji: "ko", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "k", learningOrder: 1, selected: false },

  // S-group
  { symbol: "サ", romanji: "sa", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "s", learningOrder: 2, selected: false },
  { symbol: "シ", romanji: "shi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "s", learningOrder: 2, selected: false },
  { symbol: "ス", romanji: "su", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "s", learningOrder: 2, selected: false },
  { symbol: "セ", romanji: "se", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "s", learningOrder: 2, selected: false },
  { symbol: "ソ", romanji: "so", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "s", learningOrder: 2, selected: false },

  // T-group
  { symbol: "タ", romanji: "ta", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "t", learningOrder: 3, selected: false },
  { symbol: "チ", romanji: "chi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "t", learningOrder: 3, selected: false },
  { symbol: "ツ", romanji: "tsu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "t", learningOrder: 3, selected: false },
  { symbol: "テ", romanji: "te", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "t", learningOrder: 3, selected: false },
  { symbol: "ト", romanji: "to", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "t", learningOrder: 3, selected: false },

  // N-group
  { symbol: "ナ", romanji: "na", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "n", learningOrder: 4, selected: false },
  { symbol: "ニ", romanji: "ni", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "n", learningOrder: 4, selected: false },
  { symbol: "ヌ", romanji: "nu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "n", learningOrder: 4, selected: false },
  { symbol: "ネ", romanji: "ne", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "n", learningOrder: 4, selected: false },
  { symbol: "ノ", romanji: "no", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "n", learningOrder: 4, selected: false },

  // H-group
  { symbol: "ハ", romanji: "ha", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "h", learningOrder: 5, selected: false },
  { symbol: "ヒ", romanji: "hi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "h", learningOrder: 5, selected: false },
  { symbol: "フ", romanji: "fu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "h", learningOrder: 5, selected: false },
  { symbol: "ヘ", romanji: "he", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "h", learningOrder: 5, selected: false },
  { symbol: "ホ", romanji: "ho", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "h", learningOrder: 5, selected: false },

  // M-group
  { symbol: "マ", romanji: "ma", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "m", learningOrder: 6, selected: false },
  { symbol: "ミ", romanji: "mi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "m", learningOrder: 6, selected: false },
  { symbol: "ム", romanji: "mu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "m", learningOrder: 6, selected: false },
  { symbol: "メ", romanji: "me", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "m", learningOrder: 6, selected: false },
  { symbol: "モ", romanji: "mo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "m", learningOrder: 6, selected: false },

  // Y-group
  { symbol: "ヤ", romanji: "ya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "y", learningOrder: 7, selected: false },
  { symbol: "ユ", romanji: "yu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "y", learningOrder: 7, selected: false },
  { symbol: "ヨ", romanji: "yo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "y", learningOrder: 7, selected: false },

  // R-group
  { symbol: "ラ", romanji: "ra", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "r", learningOrder: 8, selected: false },
  { symbol: "リ", romanji: "ri", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "r", learningOrder: 8, selected: false },
  { symbol: "ル", romanji: "ru", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "r", learningOrder: 8, selected: false },
  { symbol: "レ", romanji: "re", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "r", learningOrder: 8, selected: false },
  { symbol: "ロ", romanji: "ro", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "r", learningOrder: 8, selected: false },

  // W-group
  { symbol: "ワ", romanji: "wa", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "w", learningOrder: 9, selected: false },
  { symbol: "ヲ", romanji: "wo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "w", learningOrder: 9, selected: false },

  // Special character
  { symbol: "ン", romanji: "n", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "none", group: "special", learningOrder: 10, selected: false },

  // Dakuten
  // G-group
  { symbol: "ガ", romanji: "ga", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "g", learningOrder: 11, selected: false },
  { symbol: "ギ", romanji: "gi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "g", learningOrder: 11, selected: false },
  { symbol: "グ", romanji: "gu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "g", learningOrder: 11, selected: false },
  { symbol: "ゲ", romanji: "ge", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "g", learningOrder: 11, selected: false },
  { symbol: "ゴ", romanji: "go", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "g", learningOrder: 11, selected: false },

  // Z-group
  { symbol: "ザ", romanji: "za", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "z", learningOrder: 12, selected: false },
  { symbol: "ジ", romanji: "ji", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "z", learningOrder: 12, selected: false },
  { symbol: "ズ", romanji: "zu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "z", learningOrder: 12, selected: false },
  { symbol: "ゼ", romanji: "ze", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "z", learningOrder: 12, selected: false },
  { symbol: "ゾ", romanji: "zo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "z", learningOrder: 12, selected: false },

  // D-group
  { symbol: "ダ", romanji: "da", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "d", learningOrder: 13, selected: false },
  { symbol: "ヂ", romanji: "ji", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "d", learningOrder: 13, selected: false },
  { symbol: "ヅ", romanji: "zu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "d", learningOrder: 13, selected: false },
  { symbol: "デ", romanji: "de", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "d", learningOrder: 13, selected: false },
  { symbol: "ド", romanji: "do", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "d", learningOrder: 13, selected: false },

  // B-group
  { symbol: "バ", romanji: "ba", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "b", learningOrder: 14, selected: false },
  { symbol: "ビ", romanji: "bi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "b", learningOrder: 14, selected: false },
  { symbol: "ブ", romanji: "bu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "b", learningOrder: 14, selected: false },
  { symbol: "ベ", romanji: "be", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "b", learningOrder: 14, selected: false },
  { symbol: "ボ", romanji: "bo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "dakuten", group: "b", learningOrder: 14, selected: false },

  // Handakuten
  // P-group
  { symbol: "パ", romanji: "pa", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "handakuten", group: "p", learningOrder: 15, selected: false },
  { symbol: "ピ", romanji: "pi", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "handakuten", group: "p", learningOrder: 15, selected: false },
  { symbol: "プ", romanji: "pu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "handakuten", group: "p", learningOrder: 15, selected: false },
  { symbol: "ペ", romanji: "pe", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "handakuten", group: "p", learningOrder: 15, selected: false },
  { symbol: "ポ", romanji: "po", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "monograph", modifier: "handakuten", group: "p", learningOrder: 15, selected: false },

  // Digraphs
  // K-group
  { symbol: "キャ", romanji: "kya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "k", learningOrder: 16, selected: false },
  { symbol: "キュ", romanji: "kyu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "k", learningOrder: 16, selected: false },
  { symbol: "キョ", romanji: "kyo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "k", learningOrder: 16, selected: false },

  // S-group
  { symbol: "シャ", romanji: "sha", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "s", learningOrder: 17, selected: false },
  { symbol: "シュ", romanji: "shu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "s", learningOrder: 17, selected: false },
  { symbol: "ショ", romanji: "sho", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "s", learningOrder: 17, selected: false },

  // T-group
  { symbol: "チャ", romanji: "cha", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "t", learningOrder: 18, selected: false },
  { symbol: "チュ", romanji: "chu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "t", learningOrder: 18, selected: false },
  { symbol: "チョ", romanji: "cho", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "t", learningOrder: 18, selected: false },

  // N-group
  { symbol: "ニャ", romanji: "nya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "n", learningOrder: 19, selected: false },
  { symbol: "ニュ", romanji: "nyu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "n", learningOrder: 19, selected: false },
  { symbol: "ニョ", romanji: "nyo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "n", learningOrder: 19, selected: false },

  // H-group
  { symbol: "ヒャ", romanji: "hya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "h", learningOrder: 20, selected: false },
  { symbol: "ヒュ", romanji: "hyu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "h", learningOrder: 20, selected: false },
  { symbol: "ヒョ", romanji: "hyo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "h", learningOrder: 20, selected: false },

  // M-group
  { symbol: "ミャ", romanji: "mya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "m", learningOrder: 21, selected: false },
  { symbol: "ミュ", romanji: "myu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "m", learningOrder: 21, selected: false },
  { symbol: "ミョ", romanji: "myo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "m", learningOrder: 21, selected: false },

  // R-group
  { symbol: "リャ", romanji: "rya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "r", learningOrder: 22, selected: false },
  { symbol: "リュ", romanji: "ryu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "r", learningOrder: 22, selected: false },
  { symbol: "リョ", romanji: "ryo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "none", group: "r", learningOrder: 22, selected: false },

  // Dakuten & Digraphs
  // G-group
  { symbol: "ギャ", romanji: "gya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "dakuten", group: "g", learningOrder: 23, selected: false },
  { symbol: "ギュ", romanji: "gyu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "dakuten", group: "g", learningOrder: 23, selected: false },
  { symbol: "ギョ", romanji: "gyo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "dakuten", group: "g", learningOrder: 23, selected: false },

  // Z-group
  { symbol: "ジャ", romanji: "ja", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "dakuten", group: "z", learningOrder: 24, selected: false },
  { symbol: "ジュ", romanji: "ju", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "dakuten", group: "z", learningOrder: 24, selected: false },
  { symbol: "ジョ", romanji: "jo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "dakuten", group: "z", learningOrder: 24, selected: false },

  // D-group
  { symbol: "ダ", romanji: "ja", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "dakuten", group: "d", learningOrder: 25, selected: false },
  { symbol: "ヂ", romanji: "ju", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "dakuten", group: "d", learningOrder: 25, selected: false },
  { symbol: "ヂョ", romanji: "jo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "dakuten", group: "d", learningOrder: 25, selected: false },

  // B-group
  { symbol: "ビャ", romanji: "bya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "dakuten", group: "b", learningOrder: 26, selected: false },
  { symbol: "ビュ", romanji: "byu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "dakuten", group: "b", learningOrder: 26, selected: false },
  { symbol: "ビョ", romanji: "byo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "dakuten", group: "b", learningOrder: 26, selected: false },

  // Handakuten & Digraphs
  // P-group
  { symbol: "ピャ", romanji: "pya", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "handakuten", group: "p", learningOrder: 27, selected: false },
  { symbol: "ピュ", romanji: "pyu", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "handakuten", group: "p", learningOrder: 27, selected: false },
  { symbol: "ピョ", romanji: "pyo", level: 0, weight: 50, streak: 0, cooldown: 0, alphabet: "katakana", phoneme: "digraph", modifier: "handakuten", group: "p", learningOrder: 27, selected: false }
]

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    updateCharacterScore(state, action) {
      // SRS
      const { character, correct } = action.payload

      const char = state.find(char => char.symbol === character.symbol)

      if (!char) {
        console.error("Character not found")
        return
      }
      if (correct) {
        // Room for future improvement: increase exponentially/logarithmically/etc.
        char.streak += 1
        const streakMultiplier = char.streak + 2 / 3 // 1, 1.33, 1.66, 2, ...
        const bonus = Math.floor(streakMultiplier * 5)

        char.weight = Math.max(char.weight - bonus, 5) // -10, -13, -16, -20, ...
        char.level = Math.min(char.level + bonus, 100) // 10, 13, 16, 20, ...
      } else {
        char.streak = 0
        char.weight = Math.min(char.weight + 5, 100)
        char.level = Math.max(char.level - 5, 0)
        // Update romanji character
      }
    },
    updateCharacter(state, action) {
      const { character } = action.payload
      const char = state.find(char => char.symbol === character.symbol)

      if (!char) {
        console.error("Character not found")
        return
      }

      char.level = character.level
      char.weight = character.weight
      char.streak = character.streak
      char.cooldown = character.cooldown
      char.selected = character.selected
    },
    loadState(state, action) {
      return action.payload
    }
  }
})

export const { updateCharacterScore, updateCharacter } = charactersSlice.actions
export default charactersSlice.reducer
