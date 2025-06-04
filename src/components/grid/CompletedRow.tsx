import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
// import { CONFIG } from '../../constants/config'
// import { oklchToSrgb, rgbToHex } from '../../lib/colorConversion'

type Props = {
  guess: string[]
  solution: string
  index: number
  faeri: boolean
}

export const CompletedRow = ({ guess, solution, index, faeri }: Props) => {
  const statuses = getGuessStatuses(guess, solution)

  // let bgHex = ''
  // let textHex = ''

  // if (faeri) {
  //   const shiftSize = 1 / CONFIG.tries

  //   textHex = rgbToHex(
  //     ...oklchToSrgb(0.903, 0.1259, (index * shiftSize * 360 + 30) % 360)
  //   )
  // }

  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} faeri />
      ))}
    </div>
  )
}
