import React, { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import style from "./Header.module.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHandHoldingMedical } from "react-icons/fa6";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullname, setFullname] = useState('');
  const [role, setRole] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedFullname = localStorage.getItem('fullname');
    const storedRole = localStorage.getItem('role');

    if (token) {
      setIsAuthenticated(true);
      setFullname(storedFullname || '');
      setRole(storedRole || '');
    } else {
      setIsAuthenticated(false);
    }
  }, [location.pathname]); // ← refresh on path change

  const toggleDrawer = () => {
    setIsOpen(prev => !prev);
  };

  const goToHome = () => navigate('/');
  const goToBlog = () => navigate('/blog');
  const goToDoctors = () => navigate('/doctors');
  const goToContact = () => navigate('/contact');
  const goToAppointement = () => navigate('/appointement');
  const goToDepartament = () => navigate('/departament');

  const handleLoginClick = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      if (role === 'doctor') {
        navigate('/doctor/dashboard');
      } else if (role === 'patient') {
        navigate('/patient/dashboard');
      } else {
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();    
    setIsAuthenticated(false);
    navigate('/');
  };
  

  // yalnız dashboard səhifələrində logout göstərilsin
  const isDashboardPage =
    location.pathname.startsWith('/patient/dashboard') ||
    location.pathname.startsWith('/doctor/dashboard') ||
    location.pathname.startsWith('/admin');


  return (
    <div className={style.header}>
      <div className={style.container}>
        <h1><span><FaHandHoldingMedical /></span>MedOne</h1>

        <div className={style.nav}>
          <ul>
            <li><a onClick={goToHome} href="#">Home</a></li>
            <li><a onClick={goToDepartament} href="#">Departament</a></li>
            <li><a onClick={goToDoctors} href="#">Doctors</a></li>
            <li><a onClick={goToBlog} href="#">Blog</a></li>
            <li><a onClick={goToContact} href="#">Contact</a></li>
          </ul>
        </div>

        {isAuthenticated && isDashboardPage ? (
          <div className={style.userSection}>
            <button className={style.logout} onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button className={style.login} onClick={handleLoginClick}>Login</button>
        )}

        <div className={style.ham}>
          <button onClick={toggleDrawer}>&#9776;</button>
          <Drawer open={isOpen} onClose={toggleDrawer} direction='right'>
            <div className={style.hamNAV}>
              <ul>
                <li><a onClick={goToHome} href="#">Home</a></li>
                <li><a onClick={goToDepartament} href="#">Departament</a></li>
                <li><a onClick={goToDoctors} href="#">Doctors</a></li>
                <li><a onClick={goToBlog} href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>

                {isAuthenticated && isDashboardPage ? (
                  <li><a onClick={handleLogout} href="#">Logout</a></li>
                ) : (
                  <li><a onClick={handleLoginClick} href="#">Login</a></li>
                )}
              </ul>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Header;
