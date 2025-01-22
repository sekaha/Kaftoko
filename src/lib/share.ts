import { getGuessStatuses } from './statuses'
import { getDailyWord } from './words'
import { CONFIG } from '../constants/config'

export const shareStatus = (
  guesses: string[][],
  lost: boolean,
  gameMode: string,
  solution: string
) => {
  let header = '#' + CONFIG.language

  if (gameMode === 'random') {
    header += ' Udachi'
  } else {
    header += ' #' + getDailyWord().solutionIndex
  }

  navigator.clipboard.writeText(
    header +
      ': ' +
      `${lost ? 'X' : guesses.length}` +
      '/' +
      CONFIG.tries.toString() +
      '\n\n' +
      generateEmojiGrid(guesses, solution) +
      '\n\n' +
      generateSpoiler(guesses, solution) +
      'https://sekaha.github.io/Kaftoko/' // window.location.href.replace(`https://${window.location.protocol}//`,Viossa367 2/7
  )
}

export const generateSpoiler = (
  guesses: string[][],
  solution: string
): string => {
  let res = 'Ahman:\n||```ansi\n'

  res += guesses
    .map((guess) => {
      const status = getGuessStatuses(guess, solution)

      return guess
        .map((c, i) => {
          switch (status[i]) {
            case 'correct':
              return '[2;33m[2;34m' + c + '[0m[2;33m[0m'
            case 'present':
              return '[2;33m' + c + '[0m'
            default:
              return c
          }
        })
        .join('')
    })
    .join('\n')

  res += '\n```\n||'

  return res
}

export const generateEmojiGrid = (guesses: string[][], solution: string) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess, solution)
      return guess
        .map((c, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟦'
            case 'present':
              return '🟨'
            default:
              return '⬛'
          }
        })
        .join('')
    })
    .join('\n')
}
