import React from 'react';
import '../Products/Products';

const ReviewsItem = (props) => {
    const {name, quantity, img, seller, price, key} = props.product
    return (
        <div className ="single-product">
            <div className='product-image'>
                <img src={img} alt=""/>
            </div>
            <div className='product-details'>
                <h4 className='product-name'>{name}</h4>
                <p>by: {seller}</p>
                <p>${price}</p>
                <p>Quantity: {quantity}</p>
               <button 
                 className='cartBtn'
                 onClick = {() => props.removeItem(key)}
                > Remove Item</button>
            </div>
        </div>
            
    );
};

export default ReviewsItem;