import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './localStorage'

import { CONFIG } from '../constants/config'

// In stats array elements 0-5 are successes in 1-6 trys

export const addStatsForCompletedGame = (
  gameStats: GameStats,
  count: number,
  gameMode: string
) => {
  // Count is number of incorrect guesses before end.
  const stats = { ...gameStats }

  stats.heelSpilAtai += 1

  if (count > CONFIG.tries - 1) {
    // A fail situation
    stats.imaDahrofai = 0
    stats.humbaSpilAtai += 1
  } else {
    stats.jingFjal[count] += 1
    stats.imaDahrofai += 1

    if (stats.lesteBraaDahrofai < stats.imaDahrofai) {
      stats.lesteBraaDahrofai = stats.imaDahrofai
    }
  }

  stats.jingatai = getSuccessRate(stats)

  saveStatsToLocalStorage(stats, gameMode)
  return stats
}

export const loadStats = (gameMode: string) => {
  return (
    loadStatsFromLocalStorage(gameMode) || {
      jingFjal: [0, 0, 0, 0, 0, 0],
      humbaSpilAtai: 0,
      imaDahrofai: 0,
      lesteBraaDahrofai: 0,
      heelSpilAtai: 0,
      jingatai: 0,
    }
  )
}

const getSuccessRate = (gameStats: GameStats) => {
  const { heelSpilAtai, humbaSpilAtai } = gameStats

  return Math.round(
    (100 * (heelSpilAtai - humbaSpilAtai)) / Math.max(heelSpilAtai, 1)
  )
}
