import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import leoProfanity from 'leo-profanity'
import rollbar from './rollbar/rollbarConfig'
import ErrorBoundary from './rollbar/ErrorBoundary.jsx'

import store from './store'
import App from './components/App'
import resources from './locales/index'
import { checkAuth } from './slices/authSlice'

const initI18n = async () => {
  await i18next.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  })
}

leoProfanity.add(leoProfanity.getDictionary('en'))
leoProfanity.add(leoProfanity.getDictionary('ru'))

const init = async (root) => {
  try {
    await initI18n()
    await store.dispatch(checkAuth())

    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <Provider store={store}>
            <BrowserRouter>
              <I18nextProvider i18n={i18next}>
                <App />
              </I18nextProvider>
            </BrowserRouter>
          </Provider>
        </ErrorBoundary>
      </React.StrictMode>,
    )
  }
  catch (err) {
    rollbar.error('App initialization failed', err)
  }
}
export default init
