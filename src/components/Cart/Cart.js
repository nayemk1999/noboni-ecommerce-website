import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;

    }
    let shipping = 0;
    if (total > 200) {
        shipping = 0;
    }
    else if (total > 100) {
        shipping = 4.85
    }
    else if (total > 80) {
        shipping = 12.45
    }
    else if(total>40){
        shipping = 15.65
    }
    let tax = Math.round(total / 5);

    let grandTotal = Math.round(shipping) + tax + Math.round(total);
    return (
        <div>
            <div className='orderSummary'>
                <h1>Order Summary</h1>
                <h3 >Items Add Cart: {cart.length}</h3>
            </div>
            <div>
                <h4>Shipping Cost: ${Math.round(shipping)}</h4>
                <h4>Tax & VAT: ${tax}</h4>
                <h4>Total Price: ${grandTotal}</h4>
                <br/>
                <Link to ="/order-reviews"><button className ="cartBtn">Review Order</button></Link>
                
            </div>
          
        </div>
        
    );
};

export default Cart;