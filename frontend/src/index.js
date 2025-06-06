import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import init from './init.jsx'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found!')
rootElement.innerHTML = '<div class="loader">Loading translations...</div>'

init().catch(console.error)
