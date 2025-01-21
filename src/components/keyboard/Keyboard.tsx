import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ORTHOGRAPHY } from '../../constants/orthography'
import { useTranslation } from 'react-i18next'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[][]
  solution: string
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  solution,
}: Props) => {
  const { t } = useTranslation()
  const charStatuses = getStatuses(guesses, solution)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key.toUpperCase()

        if (key.length === 1 && ((key >= 'A' && key <= 'Z') || key === ' ')) {
          onChar(key !== ' ' ? key : '_')
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      {/* Top Row */}
      <div className="flex justify-center mb-1">
        {ORTHOGRAPHY.slice(0, 9).map(
          // Math.floor(ORTHOGRAPHY.length * 0.4)
          (char) => (
            <Key
              key={char}
              value={char}
              onClick={onClick}
              status={charStatuses[char]}
            />
          )
        )}
      </div>

      {/* Home Row */}
      <div className="flex justify-center mb-1">
        {ORTHOGRAPHY.slice(
          9, //Math.floor(ORTHOGRAPHY.length * 0.4),
          18 //Math.floor(ORTHOGRAPHY.length * 0.7)
        ).map((char) => (
          <Key
            key={char}
            value={char}
            onClick={onClick}
            status={charStatuses[char]}
          />
        ))}
      </div>

      {/* Bottom Row */}
      <div className="flex justify-center mb-1">
        <Key key="ahmanPresmi" width={62} value="ENTER" onClick={onClick}>
          {t('ahmanPresmi')}
        </Key>
        {ORTHOGRAPHY.slice(18, ORTHOGRAPHY.length).map((char) => (
          <Key
            key={char}
            value={char}
            onClick={onClick}
            status={charStatuses[char]}
          />
        ))}
        <Key key="keshitePresmi" width={62} value="DELETE" onClick={onClick}>
          {t('keshitePresmi')}
        </Key>
      </div>

      {/* Space bar, width={65.4}*/}
      <div className="flex justify-center">
        <Key key="oharePresmi" width={260.5} value="_" onClick={onClick}>
          {t('oharePresmi')}
        </Key>
      </div>
    </div>
  )
}
