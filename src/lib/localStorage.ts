type StoredGameState = {
  guesses: string[][]
  solution: string
  seed: number
}

export const saveGameStateToLocalStorage = (
  gameState: StoredGameState,
  gameMode: string
) => {
  localStorage.setItem(gameMode + '_game', JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = (gameMode: string) => {
  const state = localStorage.getItem(gameMode + '_game')
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
  localStorage.setItem(`${gameMode}_stats`, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = (gameMode: string) => {
  const stats = localStorage.getItem(`${gameMode}_stats`)
  const res = stats ? (JSON.parse(stats) as GameStats) : null
  return res
}
