// Import icons from external libraries
import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { TranslateIcon } from '@heroicons/react/outline'
import { CalendarIcon } from '@heroicons/react/outline'
import { CgDice5 } from 'react-icons/cg'
import { GiDiceFire } from 'react-icons/gi'
import { GiPerspectiveDiceSixFacesThree } from 'react-icons/gi'
// import { ParticleEffects } from './components/ParticleEffects'

// React hooks and component imports
// <LiaFireAltSolid />
// <GiDiceFire />
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { TranslateModal } from './components/modals/TranslateModal'

// Game-related helper functions and constants
import { isWordInWordList, getDailyWord, getRandomWord } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'
import { CONFIG } from './constants/config'

// Analytics and localization imports
import ReactGA from 'react-ga'
import '@bcgov/bc-sans/css/BCSans.css'
import './i18n'
import { withTranslation, WithTranslation } from 'react-i18next'
import { WORDS } from './constants/wordlist'

const ALERT_TIME_MS = 2000 // Time duration for alerts

const App: React.FC<WithTranslation> = ({ t, i18n }) => {
  // Game state variables
  const [currentGuess, setCurrentGuess] = useState<Array<string>>([]) // Current word being guessed
  const [isGameWon, setIsGameWon] = useState(false) // Tracks if the game is won
  const [seed, setSeed] = useState(Math.floor(Math.random() * WORDS.length))
  const [gameMode, setGameMode] = useState('daily') // Daily or random mode
  const [solution, setSolution] = useState(getDailyWord().solution)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false) // Info modal visibility
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false) // About modal visibility
  const [isnaiLagomKirain, setIsnaiLagomKirain] = useState(false) // Alert for invalid word length
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false) // Stats modal visibility
  const [isI18nModalOpen, setIsI18nModalOpen] = useState(false) // Translation modal visibility
  const [isnaiFinnaKoAlertOpen, setIsnaiFinnaKoAlertOpen] = useState(false) // Alert for invalid word
  const [isUdachikoAlertOpen, setIsUdachikoAlertOpen] = useState(false) // Alert for game mode switch
  const [isImadahkoAlertOpen, setIsImadahkoAlertOpen] = useState(false) // Alert for another mode switch
  const [isRofaiAlertOpen, setIsRofaiAlertOpen] = useState(false) // Alert for another mode switch
  const [isGameLost, setIsGameLost] = useState(false) // Tracks if the game is lost
  const [successAlert, setSuccessAlert] = useState('') // Displays success messages

  // Reload all data when gamemode is changed
  useEffect(() => {
    setGuesses([])
    setCurrentGuess([])
    setIsGameWon(false)
    setIsGameLost(false)

    const loaded = loadGameStateFromLocalStorage(gameMode)

    if (loaded) {
      if (gameMode === 'daily' && loaded.solution !== solution) {
        // Reset on new day
      } else {
        setGuesses(loaded.guesses)

        if (seed !== loaded.seed) {
          //setSeed(loaded.seed)
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
      }
    }

    setStats(loadStats(gameMode))
  }, [gameMode]) // will load initially and then whenever gameMode is updated

  // Load and initialize guesses from localStorage
  const [guesses, setGuesses] = useState<string[][]>(() => {
    const loaded = loadGameStateFromLocalStorage(gameMode)

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

  // Initialize Google Analytics if applicable
  const TRACKING_ID = CONFIG.googleAnalytics
  if (TRACKING_ID && process.env.NODE_ENV !== 'test') {
    ReactGA.initialize(TRACKING_ID)
    ReactGA.pageview(window.location.pathname)
  }

  // Load game stats
  const [stats, setStats] = useState(() => loadStats(gameMode))

  // Save game state whenever guesses update
  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution, seed }, gameMode)
  }, [guesses, seed, solution, gameMode])

  // Handlers for game modes
  const onClickUdachi = () => {
    let newSeed = seed

    // Blank slate literally everything lmao
    if (gameMode === 'random') {
      setIsUdachikoAlertOpen(true)
      setIsImadahkoAlertOpen(false)
      setIsRofaiAlertOpen(false)
      newSeed = Math.floor(Math.random() * WORDS.length)

      setSeed(newSeed)
      setGuesses([])
      setCurrentGuess([])
      setIsGameWon(false)
      setIsGameLost(false)
    }

    setSolution(getRandomWord(newSeed).solution)

    if (gameMode != 'random') {
      setGameMode('random')
    } else {
      return setTimeout(() => {
        setIsUdachikoAlertOpen(false)
      }, ALERT_TIME_MS)
    }
  }

  const onClickImadah = () => {
    setIsImadahkoAlertOpen(true)
    setIsUdachikoAlertOpen(false)
    setIsRofaiAlertOpen(false)
    setSolution(getDailyWord().solution)
    setGameMode('daily')

    return setTimeout(() => {
      setIsImadahkoAlertOpen(false)
    }, ALERT_TIME_MS)
  }

  // const onClickRofai = () => {
  //   setIsRofaiAlertOpen(true)
  //   setIsImadahkoAlertOpen(false)
  //   setIsUdachikoAlertOpen(false)

  //   return setTimeout(() => {
  //     setIsRofaiAlertOpen(false)
  //   }, ALERT_TIME_MS)
  // }

  // Handle adding a character to the current guess
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

  // Handle deleting the last character
  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  // Handle submitting a guess
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

    const winningWord = currentGuess.join('') === solution

    if (
      currentGuess.length === CONFIG.wordLength &&
      guesses.length < CONFIG.tries &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length, gameMode))

        // Congratulations, you win! ass shit
        const WIN_MESSAGES = t('jingKaku', { returnObjects: true })

        setSuccessAlert(
          WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
        )

        setTimeout(() => {
          setSuccessAlert('')
          setIsStatsModalOpen(true)
        }, ALERT_TIME_MS)

        return setIsGameWon(true)
      }

      if (guesses.length === CONFIG.tries - 1) {
        console.log('max length', stats, currentGuess, guesses.length, gameMode)

        const newStats = loadStats(gameMode)
        setStats(
          addStatsForCompletedGame(newStats, guesses.length + 1, gameMode)
        )

        // Congratulations, you... lost! Dumbass!
        if (isGameLost) {
          setTimeout(() => {
            setIsStatsModalOpen(true)
          }, ALERT_TIME_MS)
        }

        setIsGameLost(true)
      }
    }
  }

  // Render language selector if multiple languages are available
  let translateElement = <div></div>
  if (CONFIG.availableLangs.length > 1) {
    translateElement = (
      <TranslateIcon
        className="h-6 w-6 cursor-pointer hover:text-pravda_700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pravda_700"
        onClick={() => setIsI18nModalOpen(true)}
      />
    )
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8 justify-between">
        <div className="flex">
          <CalendarIcon
            className={`h-6 w-6 cursor-pointer ${
              gameMode === 'daily' ? 'text-pravda_500' : 'text-white'
            } hover:text-pravda_700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pravda_700`}
            onClick={() => {
              onClickImadah()
            }}
          />
          <GiPerspectiveDiceSixFacesThree
            className={`h-6 w-6 cursor-pointer ${
              gameMode === 'random' ? 'text-pravda_500' : 'text-white'
            } hover:text-pravda_700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pravda_700`}
            onClick={() => {
              onClickUdachi()
            }}
          />
          {/* <GiDiceFire
            className={`h-6 w-6 cursor-pointer ${
              gameMode === 'train' ? 'text-uso_500' : 'text-white'
            } hover:text-uso_700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uso_700`}
            onClick={() => {
              setGameMode('train')
              onClickRofai()
            }}
          /> */}
          <span className={'h-6 w-6'} />
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
      {/* <ParticleEffects /> */}
      <Grid guesses={guesses} currentGuess={currentGuess} solution={solution} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        solution={solution}
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
        gameMode={gameMode}
        solution={solution}
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

      {/* <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-pravda_500 hover:bg-pravda_600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pravda_700 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        {t('tsui')}
      </button> */}

      <Alert message={t('naiLagomKirain')} isOpen={isnaiLagomKirain} />

      <Alert
        message={
          <>
            <CgDice5 className="h-[1em] w-[1em] inline mb-1 mr-1" />
            {t('neoUdachiko')}
          </>
        }
        isOpen={isUdachikoAlertOpen}
        variant="info"
      />

      <Alert
        message={
          <>
            <CalendarIcon className="h-[1em] w-[1em] inline mb-1 mr-1" />
            {t('imadahko')}
          </>
        }
        isOpen={isImadahkoAlertOpen}
        variant="info"
      />

      <Alert
        message={
          <>
            <GiDiceFire className="h-[1em] w-[1em] inline mb-1 mr-1" />
            {t('rofaiko')}
          </>
        }
        isOpen={isRofaiAlertOpen}
        variant="special"
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
