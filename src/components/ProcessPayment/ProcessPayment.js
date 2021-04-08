import React from 'react';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import SplitForm from './SplitForm';

const stripePromise = loadStripe('pk_test_51Ie347FFnMI05DcT9N9MWDIVZy2eGUnxFwkGsEsXi8BnUsREgUhSzbWAE8xCMPm8Kyf0iHU2YVJ829Axn81NWEIV00ZkcFzHKO');
const ProcessPayment = ({handlePaymentSuccess}) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm handlePaymentSuccess={handlePaymentSuccess}></PaymentForm>
            </Elements>
    );
};

export default ProcessPayment;