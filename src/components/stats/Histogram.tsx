import { GameStats } from '../../lib/localStorage'
import { Progress } from './Progress'

type Props = {
  gameStats: GameStats
}

export const Histogram = ({ gameStats }: Props) => {
  const jingFjal = gameStats.jingFjal
  const maxValue = Math.max(...jingFjal)

  return (
    <div className="columns-1 justify-left m-2 text-sm">
      {jingFjal.map((value, i) => (
        <Progress
          key={i}
          index={i}
          size={90 * (value / maxValue)}
          label={String(value)}
        />
      ))}
    </div>
  )
}
