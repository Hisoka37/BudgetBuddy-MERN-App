import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import TransactionPage from './pages/TransactionPage.jsx'
import Header from "./pages/Header.jsx"
import { useQuery } from '@apollo/client';
import { GET_AUTH_USER } from './graphql/queries/user.query.js'
import { Toaster } from "react-hot-toast"

function App() {

  const {loading, error, data } = useQuery(GET_AUTH_USER)
  return (
    <>
    {data?.authUser &&  <Header/>}
    <Routes>
        <Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/transaction/:id' element={<TransactionPage />} />
				<Route path='*' element={<NotFoundPage />} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App
