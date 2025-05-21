import { useState, useEffect } from 'react'

type Props = {
  src: string
  y: number
  speed?: number
  className?: string
}

export const ScrollingImage = ({
  src,
  y,
  speed = 10,
  className = '',
}: Props) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        animationDuration: `3s`,
      }}
      className={`animate-hover overflow-hidden ${className}`}
    >
      <div
        className="animate-scroll"
        style={{ animationDuration: `${speed}s` }}
      >
        <img src={src} style={{ imageRendering: 'crisp-edges' }} />
      </div>
    </div>
  )
}
