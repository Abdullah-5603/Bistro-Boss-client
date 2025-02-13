import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
import axios from 'axios';

const CheckoutForm = ({ price, cart }) => {
    const { user } = useContext(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')

    useEffect(() => {
        console.log('Fetching clientSecret...');
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setCardError(error.message)
            console.log(error)
        } else {
            // console.log(paymentMethod)
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    },
                },
            }
        )

        if (confirmError) {
            setCardError(confirmError)
        }
        // console.log(paymentIntent)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                date: new Date(),
                price,
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.foodId),
                itemsName: cart.map(item => item.name)
            }
            axiosSecure.post('/payment', payment)
            .then(res =>{
                console.log(res.data)
                // if(res.data.data.insertedId){
                //     //display confirm
                // }
            })
        }


    }
    return (
        <form onSubmit={handleSubmit} className='flex flex-col w-2/3 justify-center'>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p className='my-3 text-red-800'>{cardError}</p>
            <button type="submit" disabled={!stripe || !clientSecret} className='my-10 w-1/3 mx-auto btn btn-primary'>Pay</button>
        </form>
    );
};

export default CheckoutForm;