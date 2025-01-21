import { MiniCompletedRow } from './MiniCompletedRow'

type Props = {
  guesses: string[][]
  solution: string
}

export const MiniGrid = ({ guesses, solution }: Props) => {
  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <MiniCompletedRow key={i} guess={guess} solution={solution} />
      ))}
    </div>
  )
}
