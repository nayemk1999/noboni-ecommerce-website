import React, { useState, useEffect } from 'react';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { useSelector } from 'react-redux';

const Shop = () => {
    const [products, setProducts] = useState([]);
    // const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            setSearch(event.target.value)
        }
    }
    const cart = useSelector(state => state.cart)
    
    return (
        <div className='main-container container'>
            <div className='searchBox'>
                <input onKeyPress={handleSearch} type="text" placeholder="type Here to search" /><Link to='/order-reviews'><span className='fontAwesome'><FontAwesomeIcon icon={faShoppingCart} /> <span className='cartCount'>{cart.length}</span> </span></Link>
            </div>
            <div className='row'>
                <div className='products col-md-8'>
                    {
                        fakeData.map(product => <Products
                            showAddToCart={true}
                            // addedCart={addedCart}
                            product={product}
                            key={product.key}
                        ></Products>)
                    }
                    
                    {/* <div class="spinner-grow text-danger spinner" role="status">
                        <span class="sr-only"></span>
                    </div> */}
                </div>

                <div className='col-md-4'>
                    <Cart cart={cart}>
                        <Link to="/order-reviews"><button className="cartBtn">Review Order</button></Link>
                    </Cart>
                </div>
            </div>
        </div>

    );
};

export default Shop;