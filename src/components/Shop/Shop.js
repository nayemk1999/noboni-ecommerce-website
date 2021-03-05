import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const [products, setProducts] = useState(fakeData);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)
        const previousCart = productKeys.map( exitingKey => {
            const product = fakeData.find(pd => pd.key === exitingKey)
            product.quantity = saveCart[exitingKey]
            return product
        })
        setCart(previousCart)
    }, [])

    const addedCart = (product) => {
        const toBeAdded = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded)
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className='main-container'>
            <div className='searchBox'>
                <input type="text" placeholder="type Here to search" /><span className='fontAwesome'><FontAwesomeIcon icon={faShoppingCart} /> <span className='cartCount'>{cart.length}</span></span>
            </div>
            <div className='product-container'>
                <div className='products'>
                    {
                        products.map(product => <Products
                            showAddToCart={true}
                            addedCart={addedCart}
                            product={product}
                            key={product.key}
                        ></Products>)
                    }
                </div>
                <div>
                    <Cart cart={cart}></Cart>
                </div>
            </div>

        </div>

    );
};

export default Shop;