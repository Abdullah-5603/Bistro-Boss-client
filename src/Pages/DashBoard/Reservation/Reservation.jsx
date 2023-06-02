import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaCreditCard } from 'react-icons/fa';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useCart from '../../../Hooks/useCart';

// TODO: provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk)

const Reservation = () => {
    const {cart} = useCart()

    const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);
    const price = parseFloat(totalPrice.toFixed(2))
    
    return (
        <div className='w-3/4 mx-auto flex flex-col'>
            <Helmet>
                <title>Food Land || Reservation</title>
            </Helmet>
            <SectionTitle heading='payment' subHeading='Why are you waiting for??'></SectionTitle>
            <Elements stripe={stripePromise}>
            <CheckoutForm cart={cart} price={price}/>
            </Elements>
        </div>
    );
};

export default Reservation;