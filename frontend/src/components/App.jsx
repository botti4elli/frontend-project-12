import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import routes from '../routes.jsx'
import Header from './Header.jsx'
import { selectIsAuthChecked } from '../slices/authSlice.js'
import { Suspense } from 'react'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const isAuthChecked = useSelector(selectIsAuthChecked)

  if (!isAuthChecked) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    )
  }

  return (
    <>
      <Header />
      <Suspense fallback={<div className="d-flex justify-content-center p-5"><div className="spinner-border text-primary" role="status" /></div>}>

        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>

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
