import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { CONFIG } from '../constants/config'

export const shareStatus = (guesses: string[][], lost: boolean) => {
  navigator.clipboard.writeText(
    CONFIG.language +
      solutionIndex +
      ' ' +
      `${lost ? 'X' : guesses.length}` +
      '/' +
      CONFIG.tries.toString() +
      '\n\n' +
      generateEmojiGrid(guesses) +
      '\n' +
      generateSpoiler(guesses) +
      '\n' +
      "https://sekaha.github.io/Kavikotoba/" // window.location.href.replace(`https://${window.location.protocol}//`,Viossa367 2/7
  )
}

export const generateSpoiler = (guesses: string[][]): string => {
  let res = "Ahman:\n||```ansi\n";

  res += guesses.map((guess) => {
    const status = getGuessStatuses(guess)

    return guess.map((c, i) => {
      switch (status[i]) {
        case 'correct':
          return '[2;33m[2;34m'+c+'[0m[2;33m[0m'
        case 'present':
          return '[2;33m'+c+'[0m'
        default:
          return c
      }
    }).join('')
  }).join("\n");
  
  res += "\n```\n||";

  return res;
};

export const generateEmojiGrid = (guesses: string[][]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .map((c, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟦'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
