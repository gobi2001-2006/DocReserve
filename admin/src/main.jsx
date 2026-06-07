import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminContextProvider from './context/AdminContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <DoctorContextProvider>
          <AppContextProvider>
            <App />
            <ToastContainer/>
          </AppContextProvider>
        </DoctorContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </StrictMode>
)