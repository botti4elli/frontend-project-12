import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center d-flex flex-column align-items-center mt-5">
      <Image
        src="/notFound.jpg"
        alt="Логотип"
        width={400}
        height={400}
        roundedCircle
      />
      <h1 className="h4 text-muted mt-4">{t('notFound', 'Страница не найдена')}</h1>
      <p className="text-muted mb-4">
        {t('youCanGo', 'Вы можете вернуться')}
        {' '}
        <Link to="/" className="text-primary">
          {t('toHomePage', 'на главную страницу')}
        </Link>
      </p>

    </div>
  );
};

export default NotFound;
