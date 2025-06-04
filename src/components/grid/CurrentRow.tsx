import { Cell } from './Cell'
import { CONFIG } from '../../constants/config'
import { oklchToSrgb, okhslToSrgb, rgbToHex } from '../../lib/colorConversion'

type Props = {
  guess: string[]
  index: number
  faeri: boolean
}

export const CurrentRow = ({ guess, index, faeri }: Props) => {
  const splitGuess = guess
  const emptyCells = Array.from(Array(CONFIG.wordLength - splitGuess.length))

  let bgHex = ''
  let textHex = ''

  if (faeri) {
    const shiftSize = 1 / CONFIG.tries

    bgHex = rgbToHex(
      ...oklchToSrgb(0.15, 0.0242, (index * shiftSize * 360 + 30) % 360)
    )

    textHex = rgbToHex(...okhslToSrgb(index * shiftSize + 30 / 360, 1, 0.65))
    // textHex = rgbToHex(
    //   ...oklchToSrgb(0.680767, 0.143256, (index * shiftSize * 360 + 30) % 360)
    // )
  }

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} bgHex={bgHex} textHex={textHex} /> //           className="shadow-[0_0_4px_white]"
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} bgHex={bgHex} textHex={textHex} />
      ))}
    </div>
  )
}
