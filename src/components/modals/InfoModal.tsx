import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { CONFIG } from '../../constants/config'
import { useTranslation } from 'react-i18next'
import 'i18next'

type Props = {
  isOpen: boolean
  faeri: boolean
  handleClose: () => void
}

interface Letter {
  letter: string
  highlight: boolean
}

export const InfoModal = ({ isOpen, faeri, handleClose }: Props) => {
  const { t } = useTranslation()
  const firstExampleWord: Letter[] = t('firstExampleWord', {
    returnObjects: true,
  })
  const secondExampleWord: Letter[] = t('secondExampleWord', {
    returnObjects: true,
  })
  const thirdExampleWord: Letter[] = t('thirdExampleWord', {
    returnObjects: true,
  })
  return (
    <BaseModal
      title={t('hurSpilNamae')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="text-sm text-white">
        {t('spiltropos', { tries: CONFIG.tries })}
      </p>

      <div className="flex justify-center mb-1 mt-4">
        {Array.isArray(firstExampleWord) &&
          firstExampleWord.map((el: Letter) => {
            if (el.highlight) {
              return (
                <Cell
                  key={el.letter}
                  value={el.letter}
                  status="correct"
                  faeri
                />
              )
            } else {
              return <Cell key={el.letter} value={el.letter} faeri />
            }
          })}
      </div>
      <p className="text-sm text-white">{t('pravdaplaasSpiltropos')}</p>
      <div className="flex justify-center mb-1 mt-4">
        {Array.isArray(secondExampleWord) &&
          secondExampleWord.map((el) => {
            if (el.highlight) {
              return (
                <Cell
                  key={el.letter}
                  value={el.letter}
                  status="present"
                  faeri
                />
              )
            } else {
              return <Cell key={el.letter} value={el.letter} faeri />
            }
          })}
      </div>
      <p className="text-sm text-white">{t('usoplaasSpiltropos')}</p>

      <div className="flex justify-center mb-1 mt-4">
        {Array.isArray(thirdExampleWord) &&
          thirdExampleWord.map((el) => {
            if (el.highlight) {
              return (
                <Cell key={el.letter} value={el.letter} status="absent" faeri />
              )
            } else {
              return <Cell key={el.letter} value={el.letter} faeri />
            }
          })}
      </div>
      <p className="text-sm text-white">{t('naiJamSpiltropos')}</p>
    </BaseModal>
  )
}
