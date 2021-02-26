import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState(fakeData);

    const [cart, setCart] = useState([]);
    const addedCart = (product) =>{
        const newCart = [...cart, product]
        setCart(newCart);
    }
    return (
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
        
    );
};

export default Shop;