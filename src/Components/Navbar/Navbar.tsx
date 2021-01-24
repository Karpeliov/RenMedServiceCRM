import React from 'react';
import style from './Navbar.module.css';
import logo from '../../assets/images/logo-RM.jpg'

const Navbar = () => {
    return (
        <div className={style.navbar}>
            <div>Оборудование</div>
            <div>Медцентры</div>
        </div>
    )
}

export default Navbar;