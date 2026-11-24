import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Videos from "../pages/Videos";
import Categories from "../pages/Categories";
import About from "../pages/About";
import { AdminDashBoard } from "../Admin/Admin-dashboard";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'videos',
        element: <Videos />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'Admin-dashboard',
        element: <AdminDashBoard />,
      },
    ],
  },
]);

export default router;
