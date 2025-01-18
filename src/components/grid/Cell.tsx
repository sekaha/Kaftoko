import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded text-white',
    {
      'bg-black border-slate-700': !status,
      'border-white': value && !status,
      'bg-slate-700 text-white border-border-slate-700': status === 'absent',
      'bg-pravda_500 text-white border-pravda_500': status === 'correct',
      'bg-uso_500 text-white border-uso_500': status === 'present',
      'cell-animation': !!value,
    }
  )

  return <div className={classes}>{value}</div>
}
