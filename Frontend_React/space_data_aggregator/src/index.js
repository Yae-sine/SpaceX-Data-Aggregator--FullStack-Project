import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LaunchesPage from './pages/launches';
import AstronautsPage from './pages/astronauts';
import AuthenticationPage from "./pages/authentication";
import FavoriteLaunches from "./pages/favoriteLaunches";

const router =createBrowserRouter([
    {path :"/" , element: <App/>},
    {path:"/launches",element: <LaunchesPage/>},
    {path:"/astronauts",element: <AstronautsPage/>},
    {path:'/authentication',element:<AuthenticationPage/>},
    {path:"/favoriteLaunches",element:<FavoriteLaunches/>}
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
