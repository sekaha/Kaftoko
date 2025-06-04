import { MiniCompletedRow } from './MiniCompletedRow'

type Props = {
  guesses: string[][]
  solution: string
  faeri: boolean
}

export const MiniGrid = ({ guesses, solution, faeri }: Props) => {
  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <MiniCompletedRow key={i} guess={guess} solution={solution} faeri />
      ))}
    </div>
  )
}
