import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './components/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
