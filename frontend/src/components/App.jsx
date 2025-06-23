import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import routes from '../routes.jsx'
import Header from './Header.jsx'
import { useTranslation } from 'react-i18next'
import { selectToken } from '../slices/authSlice.js'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const token = useSelector(selectToken)

  const [isLoading, setIsLoading] = useState(true)
  const [initError] = useState(null)

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }

    setIsLoading(false)
  }, [dispatch, token, t])

  if (isLoading) return null

  if (initError) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2 className="text-danger">
          {t('errors.loadingApp')}
        </h2>
      </div>
    )
  }

  return (
    <>
      <Header />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        progressClassName="bg-success"
      />
    </>
  )
}

export default App
