import { useEffect, useRef } from 'react'
import { okhslToSrgb, rgbToHex } from './lib/colorConversion'

type StarryBackgroundProps = {
  active: boolean
}

function StarryBackground({ active = false }: StarryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const startCount = 100
  const width = window.innerWidth
  const height = window.innerHeight

  useEffect(() => {
    // Ensure canvas is rendered before accessing the context
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const drawStars = () => {
      if (ctx) {
        ctx.canvas.width = width
        ctx.canvas.height = height
        ctx?.clearRect(0, 0, width, height)

        for (let i = 0; i < startCount; i++) {
          const x = Math.random() * width
          const y = Math.random() * height
          const radius = Math.random() * 2
          const col = rgbToHex(
            ...okhslToSrgb(Math.random(), 0.7, 0.93 - radius * 0.01)
          )

          ctx.beginPath()
          ctx.arc(x, y, 1 + radius, 0, Math.PI * 2, false)
          ctx.fillStyle = col
          ctx.fill()
        }
      }
    }

    drawStars()
  }, [])

  return (
    <canvas
      className={`canvas ${active ? 'fade-in' : ''}`}
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: '-100',
      }}
    />
  )
}

export default StarryBackground
