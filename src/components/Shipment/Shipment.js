import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder} from '../../utilities/databaseManager';
import './Shipment.css'

const Shipment = () => {
    const[loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const saveCart = getDatabaseCart()
        const orderDetails = {...loggedInUser, cart: saveCart, orderTime: new Date(), shipment: data}
        fetch('http://localhost:3001/orderProduct', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                processOrder()
               alert('Order Successfully') 
            }   
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
            < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Enter Your Name"/>
            {errors.exampleRequired && <span className="error">This field is required</span>}

            < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Enter Your Email"/>
            {errors.exampleRequired && <span className="error">This field is required</span>}

            < input name="address" ref={register({ required: true })} placeholder="Enter Your Address"/>
            {errors.exampleRequired && <span className="error">This field is required</span>}

            < input name="phone" defaultValue={loggedInUser.phone} ref={register({ required: true })} placeholder="Enter Your Phone"/>
            {errors.exampleRequired && <span className="error">This field is required</span>}

            <input type="submit" />
        </form >
    );
};

export default Shipment;