import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorElement } from './components';

import { store } from './Store';

// Loaders
import { loader as landingLoader } from './pages/Landing';
import { loader as singleProductLoader } from './pages/SingleProduct';
import { loader as productsLoader } from './pages/Products';
import { loader as checkoutLoader } from './pages/Checkout';
import { loader as ordersLoader } from './pages/Orders';

//actions
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as checkoutAction } from './components/CheckoutForm';

// Nota importante para mi mismo, en este proyecto date cuenta que todos los que están en children son outlets. Que van a salir desde home layout que los va a tener en su "vientre"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />, //Me dio error por que lo llame sin los <> y me decia que no podia poner como hijo una funcion
    children: [
      {
        index: true, //No se pone una ruta por que es el index o sea básicamente es el /
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader(queryClient),
      },
      {
        path: 'products',
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader(queryClient),
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader(queryClient),
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: ordersLoader(store, queryClient),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store), //El problema acá es que estamos "invocando por eso en la siguiente función debemos retornar una función ()=>{}"
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
