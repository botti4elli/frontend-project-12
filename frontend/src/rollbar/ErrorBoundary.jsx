import React from 'react'
import rollbar from './rollbarConfig.js'
import { withTranslation } from 'react-i18next'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    rollbar.error('React Error', error, errorInfo)
  }

  render() {
    const { t } = this.props

    if (this.state.hasError) {
      return <h1>{t('errorBoundary.fallbackMessage')}</h1>
    }

    return this.props.children
  }
}

export default withTranslation()(ErrorBoundary)
