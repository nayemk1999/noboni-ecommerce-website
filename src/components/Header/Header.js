import React from 'react';
import logo from "../../images/logo.png";
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                <a href="/shop">Shop</a>
                <a href="/order-reviews">Order-Review</a>
                <a href="/manage-inventory">Manage-Inventory</a>
            </nav>
            <div className='searchBox'>
                <input type="text" placeholder ="type Here to search"/><span className='fontAwesome'><FontAwesomeIcon icon={faShoppingCart} /> <span className='cartCount'>0</span></span> 
            </div>
        </div>
    );
};

export default Header;