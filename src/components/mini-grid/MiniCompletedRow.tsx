import { getGuessStatuses } from '../../lib/statuses'
import { MiniCell } from './MiniCell'

type Props = {
  guess: string[]
  solution: string
  faeri: boolean
}

export const MiniCompletedRow = ({ guess, solution, faeri }: Props) => {
  const statuses = getGuessStatuses(guess, solution)

  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter, i) => (
        <MiniCell key={i} status={statuses[i]} letter={letter} faeri />
      ))}
    </div>
  )
}
