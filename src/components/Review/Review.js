import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewsItem from '../ReviewsItems/ReviewsItem';

const Review = () => {
    const [cart, setCart] = useState([])

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
        <div>
            {
                cart.map(pd => <ReviewsItem product = {pd} key ={pd.key}></ReviewsItem>)
            }
        </div>
    );
};

export default Review;