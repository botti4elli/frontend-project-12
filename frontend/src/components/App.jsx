import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import routes from '../routes.jsx'
import Header from './Header.jsx'

import 'react-toastify/dist/ReactToastify.css'

const App = () => (
  <BrowserRouter>
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
  </BrowserRouter>
)

export default App
