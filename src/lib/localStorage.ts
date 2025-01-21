type StoredGameState = {
  guesses: string[][]
  solution: string
}

export const saveGameStateToLocalStorage = (
  gameState: StoredGameState,
  gameMode: string
) => {
  localStorage.setItem(gameMode, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = (gameMode: string) => {
  const state = localStorage.getItem(gameMode)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

export type GameStats = {
  jingFjal: number[]
  humbaSpilAtai: number
  imaDahmwerm: number
  lesteBraaDahmwerm: number
  heelSpilAtai: number
  jingatai: number
}

export const saveStatsToLocalStorage = (
  gameStats: GameStats,
  gameMode: string
) => {
  localStorage.setItem(gameMode + '_stats', JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = (mode: string) => {
  const stats = localStorage.getItem(mode)
  return stats ? (JSON.parse(stats) as GameStats) : null
}
