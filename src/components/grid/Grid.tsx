import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'
import { CONFIG } from '../../constants/config'

type Props = {
  guesses: string[][]
  currentGuess: string[]
  solution: string
  faeri: boolean
  djeza: boolean
}

export const Grid = ({
  guesses,
  currentGuess,
  solution,
  faeri,
  djeza,
}: Props) => {
  const empties =
    guesses.length < CONFIG.tries - 1
      ? Array.from(Array(CONFIG.tries - 1 - guesses.length))
      : []

  console.log('grid', djeza)

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
        <CurrentRow
          guess={currentGuess}
          index={guesses.length}
          faeri
          djeza={djeza}
        />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} index={i + guesses.length + 1} faeri djeza={djeza} />
      ))}
    </div>
  )
}
