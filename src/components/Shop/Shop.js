import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';

import Products from '../Products/Products';
import './Shop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const [products, setProducts] = useState(fakeData);

    const [cart, setCart] = useState([]);
    const addedCart = (product) =>{
        const newCart = [...cart, product]
        setCart(newCart);
    }
    return (
        <div className='main-container'>
            <div className='searchBox'>
                <input type="text" placeholder ="type Here to search"/><span className='fontAwesome'><FontAwesomeIcon icon={faShoppingCart} /> <span className='cartCount'>{cart.length}</span></span> 
            </div>
            <div className='product-container'>
             
             <div className='products'>
                 {
                     products.map(product=> <Products 
                         addedCart = {addedCart}
                         product = {product}
                     ></Products>)
                 }
             </div>
             <div>
                <Cart cart = {cart}></Cart>
             </div> 
         </div>
         
        </div>
        
    );
};

export default Shop;