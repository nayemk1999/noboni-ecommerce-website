import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewsItem from '../ReviewsItems/ReviewsItem';
import { useHistory } from 'react-router';

const Review = () => {
    const history = useHistory()

    const proceedCheckout = () => {
        history.push('/shipment')
    }
    let thankYou;
  
    const [cart, setCart] = useState([])
    console.log(cart);
    const removeItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)
        fetch('https://tranquil-coast-22381.herokuapp.com/productsKeys', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])
    
    return (
        <div className="product-container">
            <div className="products">
                {
                    cart.map(pd => <ReviewsItem
                        removeItem={removeItem}
                        product={pd}
                        key={pd.key}

                    ></ReviewsItem>)
                }
                {thankYou}
            </div>
            <div>
                <Cart cart={cart}>
                    <button
                        className='cartBtn'
                        onClick={proceedCheckout}
                    >Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;