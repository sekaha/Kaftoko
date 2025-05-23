import { CONFIG } from '../../constants/config'
import { BaseModal } from './BaseModal'
import { Trans, useTranslation } from 'react-i18next'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  const { t } = useTranslation()
  return (
    <BaseModal title={t('tsui')} isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-200">
        <Trans
          className="text-white"
          i18nKey="aboutAuthorSentence"
          values={{ language: CONFIG.language, author: CONFIG.author }}
        >
          This is an open source word guessing game adapted to
          {CONFIG.language} by
          <a href={CONFIG.authorWebsite} className="underline font-bold">
            {CONFIG.author}
          </a>{' '}
        </Trans>
        <Trans
          className="text-white"
          i18nKey="aboutCodeSentence">
          Have a look at
          <a
            href="https://github.com/roedoejet/AnyLanguage-Word-Guessing-Game"
            className="underline font-bold"
          >
            Aidan Pine's fork
          </a>
          and customize it for another language!
        </Trans>
        <Trans
          className="text-white"
          i18nKey="aboutDataSentence"
          values={{ wordListSource: CONFIG.wordListSource }}
        >
          The words for this game were sourced from
          <a href={CONFIG.wordListSourceLink} className="underline font-bold">
            {CONFIG.wordListSource}
          </a>
          .
        </Trans>
        <Trans
          className="text-white" i18nKey="aboutOriginalSentence">
          You can also
          <a
            href="https://www.powerlanguage.co.uk/wordle/"
            className="underline font-bold"
          >
            play the original here
          </a>
        </Trans>
      </p>
    </BaseModal>
  )
}
