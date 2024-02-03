import { Route, Routes } from 'react-router-dom'
import Bill from './pages/Bill'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

const App = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Bill />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App