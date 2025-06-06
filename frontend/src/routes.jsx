// import ChatPage from './pages/ChatPage.jsx'
// import Login from './pages/Login.jsx'
// import Signup from './pages/SignUp.jsx'
// import NotFound from './pages/NotFound.jsx'
// import PrivateRoute from './components/PrivateRoute.jsx'
//
// const route = (path, component, isPrivate = false) => ({
//   path,
//   element: isPrivate ? <PrivateRoute>{component}</PrivateRoute> : component,
// })
//
// export default [
//   route('/', <ChatPage />, true),
//   route('/login', <Login />),
//   route('/signup', <Signup />),
//   route('*', <NotFound />),
// ]
import ChatPage from './pages/ChatPage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/SignUp.jsx'
import NotFound from './pages/NotFound.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

const route = (path, Component, isPrivate = false) => ({
  path,
  element: isPrivate ? <PrivateRoute><Component /></PrivateRoute> : <Component />,
})

export default [
  route('/', ChatPage, true),
  route('/login', Login),
  route('/signup', Signup),
  route('*', NotFound),
]
