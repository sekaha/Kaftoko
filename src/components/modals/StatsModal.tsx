import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { BaseModal } from './BaseModal'
import { useTranslation } from 'react-i18next'
import { getDailyWord } from '../../lib/words'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[][]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  gameMode: string
  solution: string
  handleShare: () => void
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  gameMode,
  solution,
  handleShare,
}: Props) => {
  const { t } = useTranslation()
  if (gameStats.heelSpilAtai <= 0) {
    return (
      <BaseModal
        title={t('ataiTumam')}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal title={t('ataiTumam')} isOpen={isOpen} handleClose={handleClose}>
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-white">
        {t('ahmanFjal')}
      </h4>
      <Histogram gameStats={gameStats} />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 columns-2">
          <div>
            <h5>{t('neokoMade')}</h5>
            <Countdown
              className="text-lg font-medium text-white"
              date={getDailyWord().tomorrow}
              daysInHours={true}
            />
          </div>
          <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-pravda_500 text-base font-medium text-white hover:bg-pravda_600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pravda_700 sm:text-sm"
            onClick={() => {
              shareStatus(guesses, isGameLost, gameMode, solution)
              handleShare()
            }}
          >
            {t('blogeta')}
          </button>
        </div>
      )}
    </BaseModal>
  )
}
