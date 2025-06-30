import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom/client'
import rollbar from './rollbar/rollbarConfig.js'
import init from './init.jsx'

const rootElement = document.getElementById('root')
if (!rootElement) {
  const error = new Error('Root element not found!')
  rollbar.error(error)
  throw error
}

const root = ReactDOM.createRoot(rootElement)

root.render(
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="text-primary spinner-border" role="status" aria-label="Loading" />
  </div>,
)

const bootstrap = async () => {
  try {
    await init(root)
  }
  catch (error) {
    rollbar.error('Initialization failed', error)
  }
}

bootstrap().catch((err) => {
  rollbar.error(err)
})
