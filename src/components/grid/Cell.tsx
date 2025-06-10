import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
  bgHex?: string
  textHex?: string
  borderHex?: string
  faeri?: boolean
  djeza?: boolean
  className?: string
}

export const Cell = ({
  value,
  status,
  bgHex,
  textHex,
  borderHex,
  faeri,
  djeza,
  className,
}: Props) => {
  const classes = classnames(
    'text-white w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded shadow-current',
    {
      'bg-slate-950 border-slate-700': !status,
      'border-slate-8ss00': value && !status,
      'bg-slate-700 border-border-slate-700': status === 'absent',
      'bg-pravda_500 border-pravda_500': status === 'correct',
      'bg-trans_500 border-trans_500': status === 'present' && faeri,
      'cell-animation': !!value,
      'font-lucida': djeza,
      // 'animate-flip-horizontal-bottom': !!value && !!status,
    },
    className
  )

  const style: React.CSSProperties = {}

  if (!status && bgHex) style.backgroundColor = bgHex
  if (textHex) style.color = textHex
  if (borderHex) style.borderColor = borderHex
  // style.boxShadow = `0 0 5px currentColor, 0 0 15px ${borderHex}, 0 0 19px ${bgHex}`

  return (
    <div className={classes} style={style}>
      {value}
    </div>
  )
}
