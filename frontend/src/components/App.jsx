import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import routes from '../routes.jsx'
import Header from './Header.jsx'
import rollbar from '../rollbar/rollbarConfig.js'
import 'react-toastify/dist/ReactToastify.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>

    {/* Кнопка для отправки тестовой ошибки в Rollbar */}
    {import.meta.env.MODE !== 'test' && (
      <div className="text-center mt-4">
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            rollbar.error(new Error('Test error sent manually to Rollbar'))
          }}
        >
          Send test error
        </button>
      </div>
    )}

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
