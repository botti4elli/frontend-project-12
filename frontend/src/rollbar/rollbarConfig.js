import Rollbar from 'rollbar'

const rollbar = new Rollbar({
  accessToken: process.env.VITE_ROLLBAR_CLIENT_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV,
})

export default rollbar
