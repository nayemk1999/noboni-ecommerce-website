import React from 'react';
import './Products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Products = (props) => {
    const { name, img, seller, price, stock, key } = props.product;
    const showAddToCart = props.showAddToCart;
    const addedCart = props.addedCart;
    return (
            <div className='d-md-flex '>
                <div className='product-image justify-content-center '>
                    <img src={img} alt="" />
                </div>
                <div className='product-details justify-content-center '>
                    <h4 className='product-name'><Link to={"/product/" + key}>{name}</Link></h4>
                    <p>by: {seller}</p>
                    <p>${price}</p>
                    <p>only {stock} left in stock - order soon</p>
                    {showAddToCart && <button
                        onClick={() => addedCart(props.product)}
                        className='cartBtn'>
                        <FontAwesomeIcon icon={faShoppingCart} />
                     add to cart</button>}
                </div>
            </div>

    );
};

export default Products;