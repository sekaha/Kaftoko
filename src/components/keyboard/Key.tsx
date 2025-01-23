import { ReactNode, useState } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
  alert?: boolean
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
  alert = false,
}: Props) => {
  const [clicked, setClicked] = useState(alert)

  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none',
    {
      'bg-gray-700 hover:bg-gray-500 active:bg-gray-400': !status,
      'bg-gray-800 hover:bg-gray-600 active:bg-gray_500 text-white':
        status === 'absent',
      'bg-pravda_600 hover:bg-pravda_400 active:bg-pravda_300 text-white':
        status === 'correct',
      'bg-uso_600 hover:bg-uso_400 active:bg-uso_300 text-white':
        status === 'present',
      'cell-animation': clicked,
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setClicked(true)
    onClick(value)
    event.currentTarget.blur()

    setTimeout(() => setClicked(false), 400) // Duration matches the animation
  }

  return (
    <button
      style={{ width: `${width}px`, height: '58px' }}
      className={classes}
      onClick={handleClick}
    >
      {children || value}
    </button>
  )
}
