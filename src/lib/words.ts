import { WORDS } from '../constants/wordlist'
import { CONFIG } from '../constants/config'
import { ORTHOGRAPHY } from '../constants/orthography'

export const isWordInWordList = (word: string) => {
  return Array.from(word).every((c) => ORTHOGRAPHY.includes(c))
}

// export const isWinningWord = (word: string) => {
//   return solution === word
// }

// seed: number
export const getRandomWord = (seed: number) => {
  return { solution: WORDS[seed] }
}

export const getDailyWord = () => {
  const epochMs = new Date(CONFIG.startDate).getTime()
  const now = Date.now()
  const msInDay = 60 * 60 * 24 * 1000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = epochMs + (index + 1) * msInDay

  return {
    solution: WORDS[index % WORDS.length],
    solutionIndex: index,
    tomorrow: nextday,
  }
}

// export const { solution, solutionIndex, tomorrow } = getWordOfDay()
