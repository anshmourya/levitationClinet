import { Route, Routes } from 'react-router-dom'
import Bill from './pages/Bill'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ProtectedRoute from './pages/ProtectedRoute'

const App = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Bill />} />
        </Route>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App