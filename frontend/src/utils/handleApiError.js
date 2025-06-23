import rollbar from '../rollbar/rollbarConfig'

const handleApiError = (error, t, fallbackMessageKey = 'errors.networkError') => {
  rollbar.error('API Error', error)

  const status = error?.status || error?.response?.status

  if (status === 409) {
    return 'errors.userExists'
  }
  if (status === 401) return 'errors.loginFailed'

  return error?.data?.messageKey || fallbackMessageKey
}

export default handleApiError
