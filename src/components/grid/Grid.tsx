import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'
import { CONFIG } from '../../constants/config'

type Props = {
  guesses: string[][]
  currentGuess: string[]
  solution: string
  faeri: boolean
}

export const Grid = ({ guesses, currentGuess, solution, faeri }: Props) => {
  const empties =
    guesses.length < CONFIG.tries - 1
      ? Array.from(Array(CONFIG.tries - 1 - guesses.length))
      : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          solution={solution}
          guess={guess}
          index={i}
          faeri
        />
      ))}
      {guesses.length < CONFIG.tries && (
        <CurrentRow guess={currentGuess} index={guesses.length} faeri />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} index={i + guesses.length + 1} faeri />
      ))}
    </div>
  )
}
