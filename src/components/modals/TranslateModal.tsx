import { BaseModal } from './BaseModal'
import { CONFIG } from '../../constants/config'
import { useTranslation } from 'react-i18next'
import { localeLanguageKey } from '../../i18n'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const TranslateModal = ({ isOpen, handleClose }: Props) => {
  const { t, i18n } = useTranslation()
  const onChangeValue = (event: any) => {
    i18n.changeLanguage(event.target.value)
    localStorage.setItem(localeLanguageKey, event.target.value)
  }

  const createOption = (code: string, text: string) => {
    return (
      <button
        key={code}
        type="button"
        className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-pravda_400 text-base font-medium text-white hover:bg-pravda_600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pravda_700 sm:text-sm"
        onClick={() => {
          // Assuming i18n.changeLanguage or a similar function handles language changes
          i18n.changeLanguage(code)
        }}
      >
        {text}
      </button>
    )
  }

  return (
    <BaseModal
      title={t('sentakuGlossa')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div
        className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8 bg-gray-900"
        onChange={onChangeValue}
      >
        {CONFIG.availableLangs.map((x) => createOption(x, t(`languages.${x}`)))}
      </div>
    </BaseModal>
  )
}
