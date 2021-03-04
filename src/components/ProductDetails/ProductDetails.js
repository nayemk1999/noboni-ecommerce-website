import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FakeData from '../../fakeData'
import Products from '../Products/Products';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = FakeData.find(pd => pd.key === productKey)
    return (
        <div>
            <h1>{productKey} Details Page....</h1>
            <Products
             product ={product}
             showAddToCart = {false}
            ></Products>
            
        </div>
    );
};

export default ProductDetails;