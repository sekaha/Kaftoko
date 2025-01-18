import { WORDS } from '../constants/wordlist'
import { CONFIG } from '../constants/config'
import { ORTHOGRAPHY } from '../constants/orthography'

export const isWordInWordList = (word: string) => {
  return Array.from(word).every(c => ORTHOGRAPHY.includes(c));
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date(CONFIG.startDate).valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: WORDS[index % WORDS.length],
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
