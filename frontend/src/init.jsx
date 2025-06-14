import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ErrorBoundary } from '@rollbar/react' // ✅ только ErrorBoundary
import rollbar from './rollbar/rollbarConfig.js'
import store from './store.js'
import App from './components/App'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import resources from './locales/index.js'

const init = async () => {
  const i18n = i18next.createInstance()

  try {
    await i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: 'ru',
        fallbackLng: 'ru',
        debug: true,
        interpolation: {
          escapeValue: false,
        },
      })
  }
  catch (error) {
    console.error('i18n initialization failed:', error)
  }

  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('Root element not found!')
  }

  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ErrorBoundary rollbar={rollbar}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </ErrorBoundary>
      </Provider>
    </React.StrictMode>,
  )
}

export default init
