import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu";
import OrderMenu from "../Pages/OrderMenu/OrderMenu";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../Layout/DashBoard";
import MyCart from "../Pages/DashBoard/MyCart/MyCart";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";


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
    {
      path : 'login',
      element : <Login/>
    },
    {
      path : 'signUp',
      element : <SignUp/>
    },
    {
      path : 'dashboard',
      element : <PrivateRoute><DashBoard/></PrivateRoute>,
      children : [
        {
          path : 'myCart',
          element : <MyCart/>
        },
        {
          path : 'allUsers',
          element : <AllUsers/>
        }
      ]
    }
  ]);