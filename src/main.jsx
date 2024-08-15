import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {  Provider  } from 'react-redux'
import store from './redux/store.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './components/Error.jsx'
import ReturnSearch from './pages/ReturnSearch.jsx'
import ArtistDetails from './pages/ArtistDetails.jsx'
import SongDetails from './pages/SongDetails.jsx'
import Album from './pages/Album.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error/>,
    children: [
      {
       path: '/discover',
      },
      {
        path: '/charts',
      },
      {
        path: '/genre',
      },
      {
        path: '/album/:id',
        element: <Album/>
      },
      {
        path: '/search/:param',
        element: <ReturnSearch/>,
      },
      {
        path: '/song/:id',
        element: <SongDetails/>,
      },
      {
        path: '/artist/:id',
        element: <ArtistDetails/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
    
)
