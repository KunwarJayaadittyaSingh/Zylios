import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { BrandProvider } from './context/BrandContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <BrandProvider>
          <App />
        </BrandProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
)