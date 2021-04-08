import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const [userShipingData, setUserShipingData] = useState(null)
    const onSubmit = data => {
        setUserShipingData(data)
    };

    const handlePaymentSuccess = paymentId => {
        const saveCart = getDatabaseCart()

        const orderDetails = { 
            ...loggedInUser, 
            cart: saveCart, 
            orderTime: new Date(),
            paymentId, 
            shipment: userShipingData 
        }

        fetch('https://tranquil-coast-22381.herokuapp.com/orderProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder()
                    alert('Order Successfully')
                }
            })
    }
    return (
        <div className="row">
            <div style={{display: userShipingData ? 'none' : 'block'}} className="col-md-6">
                <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
                    < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Enter Your Name" />
                    {errors.exampleRequired && <span className="error">This field is required</span>}

                    < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Enter Your Email" />
                    {errors.exampleRequired && <span className="error">This field is required</span>}

                    < input name="address" ref={register({ required: true })} placeholder="Enter Your Address" />
                    {errors.exampleRequired && <span className="error">This field is required</span>}

                    < input name="phone" defaultValue={loggedInUser.phone} ref={register({ required: true })} placeholder="Enter Your Phone" />
                    {errors.exampleRequired && <span className="error">This field is required</span>}

                    <input type="submit" />
                </form >
            </div>
            <div style={{display: userShipingData ? 'block' : 'none'}} className="col-md-6 ">
                <h2>Please Pay:</h2>
                <ProcessPayment handlePaymentSuccess={handlePaymentSuccess}></ProcessPayment>
            </div>
        </div>
    );
};

export default Shipment;