import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'

import notFound from '../assets/notFound.jpg'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center d-flex flex-column align-items-center mt-5">
      <Image
        src={notFound}
        alt={t('logoAlt')}
        width={400}
        height={400}
        roundedCircle
      />
      <h1 className="h4 text-muted mt-4">{t('notFound.title')}</h1>
      <p className="text-muted mb-4">
        {t('notFound.description')}
        {' '}
        <Link to="/" className="text-primary">
          {t('notFound.toHomePage')}
        </Link>
      </p>
    </div>
  )
}

export default NotFound
