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
    <div className="items-center justify-center m-1 w-1/4 text-white">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  )
}

export const StatBar = ({ gameStats }: Props) => {
  const { t } = useTranslation()
  return (
    <div className="flex justify-center my-2">
      <StatItem label={t('heelIskatAtai')} value={gameStats.heelSpilAtai} />
      <StatItem label={t('jingatai')} value={`${gameStats.jingatai}%`} />
      <StatItem label={t('imaDahmwerm')} value={gameStats.imaDahmwerm} />
      <StatItem label={t('lesteBraaDahmwerm')} value={gameStats.lesteBraaDahmwerm} />
    </div>
  )
}
