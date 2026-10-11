import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CookiesProvider } from 'react-cookie'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <RouterProvider router={router}/>

    </CookiesProvider>
  </StrictMode>,
)
