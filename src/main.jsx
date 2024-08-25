import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import SemiPublicRoutes from './SemiPublicRoutes.jsx';
import Upload from './components/Upload.jsx';
import Gallery from './components/Gallery.jsx';
import DashboardCardDetails from './components/DashboardCardDetails.jsx';

const router = createBrowserRouter([

  {
    path: "/gallery/:nameId",
    element: <Gallery />
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <><Navbar /><Dashboard /><Footer /></>,
      },
      {
        path: "/upload",
        element: <><Navbar /><Upload /><Footer /></>,
      },
      {
        path: "/card/:uniqueId",
        element: <><Navbar /><DashboardCardDetails /><Footer /></>,
      },
    ]
  },
  {
    element: <SemiPublicRoutes />,
    children: [
      {
        path: "/login",
        element: <><Navbar /><Login /><Footer /></>,
      },
      {
        path: "/register",
        element: <><Navbar /><Register /><Footer /></>,
      },
      {
        path: "/",
        element: <><Navbar /><App /><Footer /></>,
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />

  </StrictMode>,
)
