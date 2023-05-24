import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu";
import OrderMenu from "../Pages/OrderMenu/OrderMenu";




  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/',
            element:<Home/>
        },
        {
          path : 'menu',
          element : <Menu/> 
        },
        {
          path : 'orderMenu/:category',
          element : <OrderMenu/>
        }
      ]
    },
  ]);