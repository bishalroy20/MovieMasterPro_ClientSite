import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Components/Home/Home.jsx';
import RootLayout from './Layout/RootLayout.jsx';
import AuthProvider from './Contexts/AuthProvider.jsx';
import Register from './Components/Home/Register.jsx';
import Login from './Components/Home/Login.jsx';
import Profile from './Components/Profile/Profile.jsx';
import PrivateRoute from './Layout/PrivateRoute.jsx';
import AddMovie from './Components/AllMovies/AddMovieForm.jsx'
import MovieDetails from './Components/AllMovies/MovieDetails.jsx';
import MyCollection from './Components/AllMovies/MyCollection.jsx';
import UpdateMovie from './Components/AllMovies/UpdateMovie.jsx';
import AllMovies from './Components/AllMovies/AllMovies.jsx';
import PublicRoute from './Layout/PublicRoute.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'movies', element: <AllMovies /> },
      { path: 'movies/:id', element: <MovieDetails /> },
      {
        element: <PublicRoute />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },

      // 🔐 Private Routes (only accessible if logged in)
      {
        element: <PrivateRoute />,
        children: [
          { path: 'profile', element: <Profile /> },
          { path: 'movies/add', element: <AddMovie /> },
          { path: 'movies/my-collection', element: <MyCollection /> },
          { path: 'movies/update/:id', element: <UpdateMovie /> },
        ],
      },
    ],
  },
]);







createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
