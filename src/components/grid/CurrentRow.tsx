import { Cell } from './Cell'
import { CONFIG } from '../../constants/config'
import { oklchToSrgb, rgbToHex } from '../../lib/colorConversion'
import { useEffect, useState } from 'react'

type Props = {
  guess: string[]
  index: number
  faeri: boolean
}

export const CurrentRow = ({ guess, index, faeri }: Props) => {
  const splitGuess = guess
  const emptyCells = Array.from(Array(CONFIG.wordLength - splitGuess.length))

  const [hueOff, setHueOff] = useState(30)

  const speed = 10

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const milliseconds = now.getSeconds() * 1000 + now.getMilliseconds()
      setHueOff((speed * milliseconds) / 1000)
    }, 1000 / speed)

    return () => clearInterval(interval)
  }, [hueOff])

  let bgHex = ''
  let textHex = ''
  let borderHex = ''

  if (faeri) {
    const shiftSize = 1 / CONFIG.tries
    const baseHue = (index * shiftSize * 360 + hueOff) % 360

    bgHex = rgbToHex(...oklchToSrgb(0.15, 0.025, baseHue))

    textHex = rgbToHex(...oklchToSrgb(0.95, 0.023, baseHue))

    borderHex = rgbToHex(...oklchToSrgb(0.3717, 0.0392, baseHue))
  }

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          bgHex={bgHex}
          textHex={textHex}
          borderHex={borderHex}
          faeri
        /> //           className="shadow-[0_0_4px_white]"
      ))}
      {emptyCells.map((_, i) => (
        <Cell
          key={i}
          bgHex={bgHex}
          textHex={textHex}
          borderHex={borderHex}
          faeri
        />
      ))}
    </div>
  )
}
