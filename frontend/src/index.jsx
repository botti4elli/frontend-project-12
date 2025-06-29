import 'bootstrap/dist/css/bootstrap.min.css'
import init from './init.jsx'
import rollbar from './rollbar/rollbarConfig.js'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found!')

window.addEventListener('error', (event) => {
  rollbar.error(event.error || event.message)
})

window.addEventListener('unhandledrejection', (event) => {
  rollbar.error(event.reason)
})

rootElement.innerHTML = '<div class="loader">Loading translations...</div>'

init().catch((error) => {
  console.error(error)
  rollbar.error(error)
})
