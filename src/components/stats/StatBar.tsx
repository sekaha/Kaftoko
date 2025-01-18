import { GameStats } from '../../lib/localStorage'
import { useTranslation } from 'react-i18next'

type Props = {
  gameStats: GameStats
}

const StatItem = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <div className="items-center justify-center m-1 w-1/4">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  )
}

export const StatBar = ({ gameStats }: Props) => {
  const { t } = useTranslation()
  return (
    <div className="flex justify-center my-2">
      <StatItem label={t('totalTries')} value={gameStats.totalGames} />
      <StatItem label={t('successRate')} value={`${gameStats.successRate}%`} />
      <StatItem label={t('currentStreak')} value={gameStats.currentStreak} />
      <StatItem label={t('bestStreak')} value={gameStats.bestStreak} />
    </div>
  )
}
