import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { TranslateIcon } from '@heroicons/react/outline'
import { CalendarIcon } from '@heroicons/react/outline'
import { CgCalendarToday, CgDice5 } from "react-icons/cg";
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { TranslateModal } from './components/modals/TranslateModal'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'

import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

import { CONFIG } from './constants/config'
import ReactGA from 'react-ga'
import '@bcgov/bc-sans/css/BCSans.css'
import './i18n'
import { withTranslation, WithTranslation } from 'react-i18next'

const ALERT_TIME_MS = 2000

const App : React.FC<WithTranslation> = ({ t, i18n }) => {
  const [currentGuess, setCurrentGuess] = useState<Array<string>>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isDaily, setIsDaily] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isnaiLagomKirain, setIsnaiLagomKirain] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isI18nModalOpen, setIsI18nModalOpen] = useState(false)
  const [isnaiFinnaKoAlertOpen, setIsnaiFinnaKoAlertOpen] = useState(false)
  const [isNeoUdachikoAlertOpen, setIsNeoUdachikoAlertOpen] = useState(false)
  const [isImadahkoAlertOpen, setIsImadahkoAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<string[][]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses
      .map((guess) => guess.join(''))
      .includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === CONFIG.tries && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })
  const TRACKING_ID = CONFIG.googleAnalytics

  if (TRACKING_ID && process.env.NODE_ENV !== 'test') {
    ReactGA.initialize(TRACKING_ID)
    ReactGA.pageview(window.location.pathname)
  }
  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      const WIN_MESSAGES = t('jingKaku', { returnObjects: true })
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost]) // , t

  const onClickUdachi = () => {
      setIsNeoUdachikoAlertOpen(true)
      setIsImadahkoAlertOpen(false)

      return setTimeout(() => {
        setIsNeoUdachikoAlertOpen(false)
      }, ALERT_TIME_MS)
  }

  const onClickImadah = () => {
    setIsImadahkoAlertOpen(true)
    setIsNeoUdachikoAlertOpen(false)

    return setTimeout(() => {
      setIsImadahkoAlertOpen(false)
    }, ALERT_TIME_MS)
}

  const onChar = (value: string) => {
    if (
      currentGuess.length < CONFIG.wordLength &&
      guesses.length < CONFIG.tries &&
      !isGameWon
    ) {
      let newGuess = currentGuess.concat([value])
      setCurrentGuess(newGuess)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === CONFIG.wordLength)) {
      setIsnaiLagomKirain(true)
      return setTimeout(() => {
        setIsnaiLagomKirain(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess.join(''))) {
      setIsnaiFinnaKoAlertOpen(true)
      return setTimeout(() => {
        setIsnaiFinnaKoAlertOpen(false)
      }, ALERT_TIME_MS)
    }
    const winningWord = isWinningWord(currentGuess.join(''))

    if (
      currentGuess.length === CONFIG.wordLength &&
      guesses.length < CONFIG.tries &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === CONFIG.tries - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }
  let translateElement = <div></div>
  
  if (CONFIG.availableLangs.length > 1) {
    translateElement = (
      <TranslateIcon
        className="h-6 w-6 cursor-pointer hover:text-pravda_700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pravda_700"
        onClick={() => setIsI18nModalOpen(true)}
      />
    )
  }
// text-pravda_500
  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8 justify-between">
        <div className="flex">
            <CalendarIcon
            className={`h-6 w-6 cursor-pointer ${ isDaily ? 'text-pravda_500' : 'text-white'} hover:text-pravda_700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pravda_700`}
            onClick={() => {setIsDaily(true); onClickImadah()}}
            />
            <CgDice5
            className={`h-6 w-6 cursor-pointer ${ isDaily ? 'text-white' : 'text-pravda_500' } hover:text-pravda_700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pravda_700`}
            onClick={() => {setIsDaily(false); onClickUdachi()}}
            />
            <span className="h-6 w-6"/>
        </div>
        
        <h1 className="text-center text-xl text-bold">{t('spilNamae')}</h1>

        <div className="flex items-center">
            {translateElement}
            <ChartBarIcon
            className="h-6 w-6 cursor-pointer text-white hover:text-pravda_700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pravda_700"
            onClick={() => setIsStatsModalOpen(true)}
            />
            <InformationCircleIcon
            className="h-6 w-6 cursor-pointer text-white hover:text-pravda_700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pravda_700"
            onClick={() => setIsInfoModalOpen(true)}
            />
        </div>
    </div>
    <Grid guesses={guesses} currentGuess={currentGuess} />
    <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
    />

    <TranslateModal
        isOpen={isI18nModalOpen}
        handleClose={() => setIsI18nModalOpen(false)}
    />
    <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        isDaily={isDaily}
        handleShare={() => {
        setSuccessAlert(t('spilWakwu'))
        return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
    />
    <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
    />
    <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
    />

    <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-pravda_500 hover:bg-pravda_600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pravda_700 select-none"
        onClick={() => setIsAboutModalOpen(true)}
    >
        {t('tsui')}
    </button>

      <Alert message={t('naiLagomKirain')} isOpen={isnaiLagomKirain} />
      <Alert
        message={(
          <>
            <CgDice5 className="h-[1em] w-[1em] inline mb-1 mr-1" />
            {t('neoUdachiko')}
          </>
        )} 
        isOpen={isNeoUdachikoAlertOpen} 
        variant="info"       
      />
      <Alert
        message={(
          <>
            <CalendarIcon className="h-[1em] w-[1em] inline mb-1 mr-1" />
            {t('imadahko')}
          </>
        )} 
        isOpen={isImadahkoAlertOpen} 
        variant="info"
      />
      <Alert message={t('naiFinnaKo')} isOpen={isnaiFinnaKoAlertOpen} />
      <Alert message={t('svar', { solution })} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default withTranslation()(App)
