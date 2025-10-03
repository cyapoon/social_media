
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Authentication from './pages/Authentication/Authentication'
import HomePage from './pages/HomePage/HomePage'
import Message from './pages/Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { use, useEffect } from 'react'
import { getProfileAction } from './Redux/Auth/auth.action'
import { ThemeProvider } from '@emotion/react'
import { darkTheme } from './theme/DarkTheme'
import Login from './pages/Authentication/Login'
import Register from './pages/Authentication/Register'


function App() {
  const { auth } = useSelector(store => store)
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch()
  

  useEffect(() => {
    if(jwt && !auth.user) {
    dispatch(getProfileAction(jwt))
  }
  }, [jwt])

  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <Routes>
          <Route path='/*' element={auth.user ? <HomePage /> : <Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/message' element={<Message />} />
        </Routes>
      </>
    </ThemeProvider>

  )
}

export default App
