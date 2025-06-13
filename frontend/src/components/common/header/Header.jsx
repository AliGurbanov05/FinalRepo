import React from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import style from "./Header.module.scss"
import { useNavigate } from 'react-router-dom';
import { FaHandHoldingMedical } from "react-icons/fa6";
const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const navigate = useNavigate();

  const goToBlog = () => {
    navigate('/blog');
  };
  const goToHome = () => {
    navigate('/');
  };
  const goToDoctors = () => {
    navigate('/doctors');
  };
  const goToDepartament = () => {
    navigate('/departament');
  };
  const goToLogin = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      if (role === 'doctor') {
        navigate('/doctor/dashboard');
      } else if (role === 'patient') {
        navigate('/patient/dashboard');
      } else {
        navigate('/login');
      }
    } else {
      navigate('/');
    }
  };


  return (
    <div className={style.header}>
      <div className={style.container}>
        <h1> <span><FaHandHoldingMedical /></span>MedOne</h1>
        <div className={style.nav}>
          <ul>
            <li><a onClick={goToHome} href="">Home</a></li>
            <li><a onClick={goToDepartament} href="">Departament</a></li>
            <li><a onClick={goToDoctors} href="">Doctors</a></li>
            <li><a onClick={goToBlog} href="">Blog</a></li>
            <li><a href="">Contact</a></li>
          </ul>
        </div>
        <button className={style.login} onClick={goToLogin}>Login</button>
        <div className={style.ham}>
          <button onClick={toggleDrawer}>&#9776;</button>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction='right'
            className='bla bla bla'
          >
            <div className={style.hamNAV}>
              <ul>
                <li><a onClick={goToHome} href="">Home</a></li>
                <li><a href="">Products</a></li>
                <li><a onClick={goToDoctors} href="">Doctors</a></li>
                <li><a onClick={goToBlog} href="">Blog</a></li>
                <li><a href="">Contact</a></li>
                <li><a onClick={goToLogin} href="">Login</a></li>
              </ul>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  )
}

export default Header
