import React from 'react';
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
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 not found</div>,
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
