import { createBrowserRouter } from "react-router-dom"
import App from "../App.tsx"
import { AdminDashBoard } from "../Admin/Admin-dashboard.tsx"

const router = createBrowserRouter([
    {
        path:'/',
        element:<App />

    },
    {
        path:'Admin-dashboard',
        element:<AdminDashBoard/>
    }
])

export default router