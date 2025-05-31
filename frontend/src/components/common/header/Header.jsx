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

  const goToBasket = () => {
    navigate('/basket');
  };
  const goToAdmin = () => {
    navigate('/admin');
  };
  const goToHome = () => {
    navigate('/');
  };
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={style.header}>
      <div className={style.container}>
        <h1> <span><FaHandHoldingMedical /></span>MedOne</h1>
        <div className={style.nav}>
          <ul>
            <li><a onClick={goToHome} href="">Home</a></li>
            <li><a onClick={goToBasket} href="">Basket</a></li>
            <li><a onClick={goToAdmin} href="">Admin</a></li>
            <li><a href="">Blog</a></li>
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
                <li><a onClick={goToBasket} href="">Products</a></li>
                <li><a onClick={goToAdmin} href="">Admin</a></li>
                <li><a href="">Special</a></li>
                <li><a href="">Testominals</a></li>
                <li><a href="">Blog</a></li>
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
