import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import useAuth from '../hooks/useAuth.js'
import { selectToken } from '../slices/authSlice.js'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  const { t } = useTranslation()
  const token = useSelector(selectToken)
  const { logout } = useAuth()

  const isAuthenticated = Boolean(token)

  return (
    <header className="bg-white text-dark py-3 border-bottom">
      <div className="container d-flex align-items-center position-relative" style={{ height: '40px' }}>
        <Link to="/" className="fs-5 text-decoration-none text-dark">
          Hexlet Chat
        </Link>

        <div className="position-absolute start-50 translate-middle-x">
          <LanguageSwitcher />
        </div>

        {isAuthenticated && (
          <div className="ms-auto">
            <Button variant="outline-primary" onClick={logout}>
              {t('logout')}
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
