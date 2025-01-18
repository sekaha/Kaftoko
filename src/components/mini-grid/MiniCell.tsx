import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  status: CharStatus
  letter: string
}

export const MiniCell = ({ status, letter }: Props) => {
  const classes = classnames(
    'w-10 h-10 border-solid border-2 border-slate-700 flex items-center justify-center mx-0.5 text-lg font-bold rounded text-white',
    {
      'bg-gray-900': status === 'absent',
      'bg-viossa_500': status === 'correct',
      'bg-usoplaas_500': status === 'present',
    }
  )

  return (
    <>
      <div className={classes}>{letter}</div>
    </>
  )
}
