import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adjust_qty, remove_from_cart } from '../../redux/Actions/CartAction';
import '../Products/Products';

const ReviewsItem = (props) => {
    const {name, quantity, img, seller, price, key} = props.product
    const disPatch = useDispatch()
    const [input, setInput] = useState(quantity)

    useEffect(() => {
        disPatch(adjust_qty(key, input))
    }, [input])

    const handlePlus = () =>{
        const plus = input+ + 1
        setInput(plus)
    }
    const handleMinus = () =>{
        const minus = input - 1
        if (minus === 0) {
            return
        }
        setInput(minus)
    }
    return (
        <div className ="single-product d-md-flex justify-content-center">
            <div className='product-image'>
                <img src={img} alt=""/>
            </div>
            <div className='product-details'>
                <h6 className='product-name'>{name}</h6>
                <p>by: {seller}</p>
                <p>${price}</p>
                <p>Quantity:
                <button 
                 className='cartBtn'
                 onClick = {handleMinus}
                > -</button>
                    <input type='number' min='1' value={input} onChange={(e)=> setInput(e.target.value) }/>
                    <button 
                 className='cartBtn'
                 onClick = {handlePlus}
                > +</button>
                    </p>
               <button 
                 className='cartBtn'
                 onClick = {() => disPatch(remove_from_cart(key))}
                > Remove Item</button>
            </div>
        </div>
            
    );
};

export default ReviewsItem;