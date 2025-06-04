import React, { useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css';
import { motion } from 'framer-motion';
import userIcon from '../../assets/images/account-circle-line.png';
import { Container, Row } from 'reactstrap';
import useAuth from '../../redux/useAuth';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';
import { MdOutlineLogout } from 'react-icons/md';
import { MdLogin } from 'react-icons/md';
import { FiUserPlus } from 'react-icons/fi';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const headerRef = useRef(null);
  const profileActionRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useAuth();

  const nav__links = [
    { path: 'home', display: 'Home' },
    { path: 'recipes', display: 'Recipes' },
    ...(isAdmin
      ? [{ path: 'upload', display: 'Recipes Upload' }]
      : []),
  ];


  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logged out');
        navigate('/login');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };


  const menuToggle = () => menuRef.current.classList.toggle('active__menu');

  const navigateToFav = () => {
    navigate('/fav');
  };

  const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions');

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row className="header0">
          <div className="nav__wrapper">
            <div className="logo">
              <Link to="/home">
                <img src={logo} alt="logo" className="logo" />
              </Link>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) => (navClass.isActive ? 'nav__active' : '')}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser && currentUser.photoURL ? currentUser.photoURL : userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />
                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <span onClick={logout}>
                        <MdOutlineLogout />
                        Logout
                      </span>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center flex-column">
                      <Link to="/signup" className="d-flex align-items-center ms-3">
                        <FiUserPlus className="me-1" />
                        Signup
                      </Link>
                      <div style={{ borderBottom: '1px solid #0000003e' }}></div>
                      <Link to="/login" className="d-flex align-items-center" style={{ marginLeft: '12px' }}>
                        <MdLogin className="me-1" />
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <span className="fav__icon" onClick={navigateToFav}>
                <i className="ri-heart-3-fill"></i>
              </span>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;