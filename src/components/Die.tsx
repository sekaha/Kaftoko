import { useState, useEffect } from 'react'
import {
  GiPerspectiveDiceSixFacesOne,
  GiPerspectiveDiceSixFacesTwo,
  GiPerspectiveDiceSixFacesThree,
  GiPerspectiveDiceSixFacesFour,
  GiPerspectiveDiceSixFacesFive,
  GiPerspectiveDiceSixFacesSix,
} from 'react-icons/gi'

type Props = {
  className: string
  onClick: () => void
  isShaking: boolean
}

export const Die = ({ className, onClick, isShaking }: Props) => {
  const [face, setFace] = useState<number>(0)

  useEffect(() => {
    if (isShaking) {
      const interval = setInterval(() => {
        setFace((prevFace) => {
          let newFace
          do {
            newFace = Math.floor(Math.random() * 6)
          } while (newFace === prevFace) // Avoid repeating the same face
          return newFace
        })
      }, 150)

      // Clear interval when shaking stops
      return () => clearInterval(interval)
    }
  }, [isShaking])

  const handleRoll = () => {
    onClick()
  }

  const icons: Record<number, React.ReactNode> = {
    0: <GiPerspectiveDiceSixFacesOne className={className} />,
    1: <GiPerspectiveDiceSixFacesTwo className={className} />,
    2: <GiPerspectiveDiceSixFacesThree className={className} />,
    3: <GiPerspectiveDiceSixFacesFour className={className} />,
    4: <GiPerspectiveDiceSixFacesFive className={className} />,
    5: <GiPerspectiveDiceSixFacesSix className={className} />,
  }

  return (
    <div
      onClick={handleRoll}
      className={`inline-block ${isShaking ? 'animate-shake' : ''}`} // Add animation to parent
    >
      {icons[face]}
    </div>
  )
}
