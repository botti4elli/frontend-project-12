import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom/client'
import rollbar from './rollbar/rollbarConfig.js'
import init from './init.jsx'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found!')
}

const root = ReactDOM.createRoot(rootElement)

init(root).catch((err) => {
  rollbar.error('Initialization failed', err)
})
