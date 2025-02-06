
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Products from './Components/Products/Products.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import ProdectRoute from './Components/ProdectRoute/ProdectRoute.jsx'
import ForgetPass from './Components/ForgetPass/ForgetPass.jsx'
import VerfiyCode from './Components/VefiyCode/VerfiyCode.jsx'
import ResetPass from './Components/ResetPass/ResetPass.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import RecentProduct from './Components/RecentProduct/RecentProduct.jsx'
import CartContextProvider from './Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import CheckOut from './Components/CheckOut/CheckOut.jsx'
import AllOrders from './Components/AllOrders/AllOrders.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import WishList from './Components/WishList/WishList.jsx'
import WishContextProvider from './Context/WishListContext.jsx'






let routers = createBrowserRouter([{
  path: '', element: <Layout />, children: [
    { path: 'register', element: <Register /> },
    { path: 'login', element: <Login /> },
    { index: true, element: <ProdectRoute><Home /></ProdectRoute> },
    { path: 'cart', element: <ProdectRoute><Cart /></ProdectRoute> },
    { path: 'brands', element: <ProdectRoute><Brands /></ProdectRoute> },
    { path: 'categories', element: <ProdectRoute><Categories /></ProdectRoute> },
    { path: 'products', element: <ProdectRoute><Products /></ProdectRoute> },
    { path: 'recentproduct', element: <ProdectRoute><RecentProduct /></ProdectRoute> },
    { path: '/productdetail/:id', element: <ProdectRoute><ProductDetails /></ProdectRoute> },
    { path: 'checkout', element: <ProdectRoute><CheckOut /></ProdectRoute> },
    { path: 'allorders', element: <ProdectRoute><AllOrders /></ProdectRoute> },
    { path: 'wishlist', element: <ProdectRoute><WishList /></ProdectRoute> },
    { path: 'forget', element: <ForgetPass /> },
    { path: 'verfiy', element: <VerfiyCode /> },
    { path: 'resetpass', element: <ResetPass /> },
    { path: '*', element: <NotFound /> },
  ]
}])

const query = new QueryClient()
function App() {

  return <>










    <WishContextProvider>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <UserContextProvider>
            <RouterProvider router={routers}></RouterProvider>
          </UserContextProvider>
          <ReactQueryDevtools />
          <Toaster />
        </CartContextProvider>
      </QueryClientProvider>
    </WishContextProvider>




  </>
}

export default App
