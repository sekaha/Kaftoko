import { ReactNode } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
}: Props) => {
  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none',
    {
      'bg-gray-800 hover:bg-gray-700 active:bg-gray-600': !status,
      'bg-gray-600 text-white': status === 'absent',
      'bg-pravda_500 hover:bg-pravda_600 active:bg-pravda_700 text-white':
        status === 'correct',
      'bg-uso_500 hover:bg-uso_600 active:bg-uso_700 text-white':
        status === 'present',
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
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
