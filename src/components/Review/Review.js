import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewsItem from '../ReviewsItems/ReviewsItem';

const Review = () => {
    const [cart, setCart] = useState([])

    const removeItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = saveCart[key]
            return product
        });
        setCart(cartProducts)
    }, [])

    return (
        <div className="product-container">
            <div className="products">
                {
                    cart.map(pd => <ReviewsItem
                        removeItem={removeItem}
                        product={pd}
                        key={pd.key}
                        cart={cart}
                    ></ReviewsItem>)
                }
            </div>
            <div>
                <Cart cart ={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;