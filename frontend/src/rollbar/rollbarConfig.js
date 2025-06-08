import Rollbar from 'rollbar'

const rollbar = new Rollbar({
  accessToken: import.meta.env.VITE_ROLLBAR_CLIENT_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: import.meta.env.MODE, // или 'production'
})

export default rollbar
