
import Register from './Components/auth/register.jsx'
import Login from './Components/auth/login.jsx'
import Create from './Components/employee/Create.jsx'
import Read from './Components/employee/Read.jsx'
import Update from './Components/employee/Update.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PrivateRoute from './Components/auth/PrivateRoute.jsx'
import Dashboard from './Components/auth/dashboard.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />


          <Route path='/dashboard' element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
          <Route path='/create' element={ <PrivateRoute> <Create /> </PrivateRoute> } />
          <Route path='/read' element={ <PrivateRoute> <Read /> </PrivateRoute> } />
          <Route path='/update/:id' element={ <PrivateRoute> <Update/> </PrivateRoute> } />
          
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={2000} />
      
    </>
  )
}

export default App
