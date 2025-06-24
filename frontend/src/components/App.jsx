import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import routes from '../routes.jsx'
import Header from './Header.jsx'
import { selectIsAuthChecked } from '../slices/authSlice.js'

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
