import { Cell } from './Cell'
import { CONFIG } from '../../constants/config'
import { oklchToSrgb, rgbToHex } from '../../lib/colorConversion'

type Props = {
  index: number
  faeri: boolean
}

export const EmptyRow = ({ index, faeri }: Props) => {
  const emptyCells = Array.from(Array(CONFIG.wordLength))

  let bgHex = ''

  if (faeri) {
    const shiftSize = 1 / CONFIG.tries

    bgHex = rgbToHex(
      ...oklchToSrgb(0.15, 0.0242, (index * shiftSize * 360 + 30) % 360)
    )
  }

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} bgHex={bgHex} />
      ))}
    </div>
  )
}
