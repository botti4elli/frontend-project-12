// import Rollbar from 'rollbar'
//
// const rollbar = new Rollbar({
//   accessToken: import.meta.env.VITE_ROLLBAR_CLIENT_TOKEN,
//   captureUncaught: true,
//   captureUnhandledRejections: true,
//   environment: import.meta.env.MODE, // или 'production'
// })
//
// export default rollbar
import Rollbar from 'rollbar'

const rollbar = new Rollbar({
  accessToken: import.meta.env.VITE_ROLLBAR_CLIENT_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: import.meta.env.MODE || 'production',
})

console.log('Rollbar initialized with token:', import.meta.env.VITE_ROLLBAR_CLIENT_TOKEN)

export default rollbar
// import Rollbar from 'rollbar'
//
// const rollbar = new Rollbar({
//   accessToken: import.meta.env.VITE_ROLLBAR_CLIENT_TOKEN,
//   captureUncaught: true,
//   captureUnhandledRejections: true,
//   environment: import.meta.env.MODE || 'development',
// })
//
// export default rollbar
