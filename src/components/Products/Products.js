import React from 'react';
import './Products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Products = (props) => {
    const {name,img,seller,price,stock} = props.product;
    const addedCart = props.addedCart;
    return (
        <div className='single-product'>
            <div className='product-image'>
                <img src={img} alt=""/>
            </div>
            <div className='product-details'>
                <h4 className='product-name'>{name}</h4>
                <p>by: {seller}</p>
                <p>${price}</p>
                <p>only {stock} left in stock - order soon</p>
                <button 
                onClick = {() =>props.addedCart(props.product)}
                className='cartBtn'>
                    <FontAwesomeIcon icon={faShoppingCart} /> 
                     add to cart</button>
            </div>
        </div>
    );
};

export default Products;