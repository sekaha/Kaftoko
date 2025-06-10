type GameState = {
  guesses: string[][]
  solution: string
  seed: number
}

export const saveGameStateToLocalStorage = (
  state: GameState,
  gameMode: string
) => {
  localStorage.setItem(gameMode + '_game', JSON.stringify(state))
}

export const loadGameStateFromLocalStorage = (
  gameMode: string
): GameState | undefined => {
  const state = localStorage.getItem(gameMode + '_game')
  return state ? (JSON.parse(state) as GameState) : undefined
}

export type GameStats = {
  jingFjal: number[]
  humbaSpilAtai: number
  imaDahrofai: number
  lesteBraaDahrofai: number
  heelSpilAtai: number
  jingatai: number
}

export const saveStatsToLocalStorage = (
  gameStats: GameStats,
  gameMode: string
) => {
  localStorage.setItem(`${gameMode}_stats`, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = (
  gameMode: string
): GameStats | undefined => {
  const stats = localStorage.getItem(`${gameMode}_stats`)
  const res = stats ? (JSON.parse(stats) as GameStats) : undefined
  return res
}
