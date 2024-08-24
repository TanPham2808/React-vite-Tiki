import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactPage from './pages/contact';
import BookPage from './pages/book';
import { Outlet } from "react-router-dom";
import Home from './components/Home';
import RegisterPage from './pages/register';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import { fetchAccountAPI } from './services/api';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import AdminPage from './pages/admin';
import ProtectedRoute from './components/ProtectedRoute';

import './styles/reset.scss';
import LayoutAdmin from './components/Admin/LayoutAdmin';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  // USER
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },  //Trang mặc định được load khi vào website
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "book",
        element: <BookPage />,
      },
    ]
  },

  // ADMIN
  {
    path: "/admin",
    element: <LayoutAdmin />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element:
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
      },  //Trang mặc định được load khi vào Admin Page (được bảo vệ bởi ProtectedRoute)
      {
        path: "user",
        element: <ContactPage />,
      },
      {
        path: "book",
        element: <BookPage />,
      },
    ]
  },

  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);

export default function App() {
  // Sử dụng hook Redux
  const dispatch = useDispatch();

  // Lấy biến isAuthenticated trong Reducer của Redux 
  // Con Reducer tên là 'account' trong file store.js
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

  // Xử lý F5 page để lấy lại thông tin (bằng việc sử dụng access_token lưu trong localStorage)
  const getAccount = async () => {

    // Nếu là trang login, register, home thì ko gọi API refesh token
    if (window.location.pathname === '/login'
      || window.location.pathname === '/register'
    ) return;

    const res = await fetchAccountAPI();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  }

  useEffect(() => {
    getAccount();
  }, [])

  return (
    <>
      {isAuthenticated === true
        || window.location.pathname === '/login'
        || window.location.pathname === '/register'
        || window.location.pathname === '/'
        ?
        <RouterProvider router={router} />
        :
        <Loading />
      }
    </>
  );
}
