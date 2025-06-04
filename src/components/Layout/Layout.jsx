import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase.config';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../routers/Routers';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && isAuthPage) {
        navigate("/home"); 
      }
    });
  }, [navigate, isAuthPage]);

  return (
    <>
      {!isAuthPage && <Header />}
      <div>
        <Routers />
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default Layout;