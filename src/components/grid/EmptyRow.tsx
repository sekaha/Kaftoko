import { Cell } from './Cell'
import { CONFIG } from '../../constants/config'
import { oklchToSrgb, rgbToHex } from '../../lib/colorConversion'
import { useEffect, useState } from 'react'

type Props = {
  index: number
  faeri: boolean
  djeza: boolean
}

export const EmptyRow = ({ index, faeri, djeza }: Props) => {
  const emptyCells = Array.from(Array(CONFIG.wordLength))

  const [hueOff, setHueOff] = useState(30)
  const speed = 10

  const calculateHue = () => {
    const now = new Date()
    const milliseconds = now.getSeconds() * 1000 + now.getMilliseconds()
    return (speed * milliseconds) / 1000
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setHueOff(calculateHue())
    }, 1000 / speed)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let bgHex = ''
  let textHex = ''
  let borderHex = ''
  let baseHue = 0

  if (faeri) {
    const shiftSize = 1 / CONFIG.tries
    baseHue = (index * shiftSize * 360 + hueOff) % 360
    bgHex = rgbToHex(...oklchToSrgb(0.15, 0.025, baseHue))
    textHex = rgbToHex(...oklchToSrgb(0.9, 0.048, baseHue))
    borderHex = rgbToHex(...oklchToSrgb(0.3717, 0.0392, baseHue))
  }

  if (djeza) {
    baseHue = 138.26
    bgHex = rgbToHex(...oklchToSrgb(0.15, 0.025, baseHue))
    textHex = rgbToHex(...oklchToSrgb(0.8984, 0.2256, baseHue))
    borderHex = rgbToHex(...oklchToSrgb(0.3717, 0.0392, baseHue))
  }

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell
          key={i}
          bgHex={bgHex}
          textHex={textHex}
          borderHex={borderHex}
          faeri
          djeza
        />
      ))}
    </div>
  )
}
