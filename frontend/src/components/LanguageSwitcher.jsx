import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown, ButtonGroup, Image } from 'react-bootstrap'

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation()
  const languages = [
    {
      code: 'en',
      label: t('language.english'),
      flag: new URL('../assets/flags/en.jpeg', import.meta.url).href,
    },
    {
      code: 'ru',
      label: t('language.russian'),
      flag: new URL('../assets/flags/ru.jpeg', import.meta.url).href,
    },
  ]
  const [currentLang, setCurrentLang] = useState(i18n.language)

  const changeLanguage = (lng) => {
    void i18n.changeLanguage(lng)
    setCurrentLang(lng)
  }

  const currentLanguage = languages.find(({ code }) => code === currentLang) || languages[0]

  return (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle variant="light" id="dropdown-language-switcher" className="d-flex align-items-center">
        <Image
          src={currentLanguage.flag}
          alt={currentLanguage.label}
          width={20}
          height={20}
          roundedCircle
          className="me-2"
        />
        {currentLanguage.label}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {languages.map(({ code, label, flag }) => (
          <Dropdown.Item
            key={code}
            active={code === currentLang}
            onClick={() => changeLanguage(code)}
            className="d-flex align-items-center"
            role="button"
          >
            <Image
              src={flag}
              alt={label}
              width={20}
              height={20}
              roundedCircle
              className="me-2"
            />
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LanguageSwitcher
