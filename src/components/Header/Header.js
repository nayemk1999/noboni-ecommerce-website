import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";
import './Header.css'



const Header = (props) => {
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/order-reviews">Order-Review</Link>
                <Link to="/manage-inventory">Manage-Inventory</Link>
            </nav>
           
        </div>
    );
};

export default Header;