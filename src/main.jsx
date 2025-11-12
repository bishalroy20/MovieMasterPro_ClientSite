import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Components/Home/Home.jsx';
import RootLayout from './Layout/RootLayout.jsx';
import AuthProvider from './Contexts/AuthProvider.jsx';
import Register from './Components/Home/Register.jsx';
import Login from './Components/Home/Login.jsx';
import Profile from './Components/Profile/Profile.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path : '/register',
        Component : Register
      },
      {
        path : '/login',
        Component : Login
      },
      {
        path : '/profile',
        Component : Profile
      }
      

      
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
