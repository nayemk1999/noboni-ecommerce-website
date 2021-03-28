import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../Products/Products';

const ProductDetails = () => {
    const {productKey} = useParams();
    const[product, setProduct] = useState({})
    useEffect(() => {
        fetch(`https://tranquil-coast-22381.herokuapp.com/products/` + productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])
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