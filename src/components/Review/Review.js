import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewsItem from '../ReviewsItems/ReviewsItem';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { remove_from_cart } from '../../redux/Actions/CartAction';

const Review = () => {
    const history = useHistory()
    // const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)
    const cart = useSelector(state => state.cart)

    const proceedCheckout = () => {
        history.push('/shipment')
    }
    let thankYou;

    const removeItem = (productKey) => {
        // const newCart = cart.filter(pd => pd.key !== productKey)
        // setCart(newCart);
        
        removeFromDatabaseCart(productKey);
    }
    // useEffect(() => {
    //     const saveCart = getDatabaseCart()
    //     const productKeys = Object.keys(saveCart)
    //     fetch('https://tranquil-coast-22381.herokuapp.com/productsKeys', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(productKeys)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setCart(data)
    //             setLoading(true)

    //         })
    // }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {
                        cart.map(pd => <ReviewsItem
                            // removeItem={removeItem}
                            product={pd}
                            // key={pd.key}

                        ></ReviewsItem>)
                            
                            // <div class="spinner-grow text-danger spinner" role="status">
                            //     <span class="sr-only"></span>
                            // </div>
                    }
                </div>
                <div className='col-md-4'>
                    <Cart cart={cart}>
                        <button
                            className='cartBtn'
                            onClick={proceedCheckout}
                        >Proceed Checkout</button>
                    </Cart>
                </div>
            </div>
        </div>

    );
};

export default Review;