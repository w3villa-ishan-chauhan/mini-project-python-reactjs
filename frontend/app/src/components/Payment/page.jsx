import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { payment_intent } from "../../api/api";
import { useAuth } from '../../context/authcontext';
import "./payment.scss"
import { use } from 'bcrypt/promises';

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [selectedAmount, setSelectedAmount] = useState(null);
    const { token } = useAuth();

    // Create PaymentIntent when the component mounts
    // useEffect(() => {
    //     const initializePayment = async () => {

    //     };

    //     initializePayment();
    // }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const clientSecret = await payment_intent({
            amount_pay: selectedAmount
        }, token);  // amount in cents
        console.log("clientSecret", clientSecret)

        const payload = await stripe.confirmCardPayment(clientSecret.data.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        });
        console.log(payload)

        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            // Upgrade user access level here or handle in webhook
        }
        window.location.reload()
    };
    const cardElementOptions = {
        style: {
            base: {
                fontSize: '14px', // Set your desired font size here
                color: '#424770', // Customize the text color
                '::placeholder': {
                    color: '#aab7c4', // Customize the placeholder color
                },
                '@media screen and (max-width: 480px)': {
                    fontSize: '12px', // Smaller font size for smaller screens
                },
            },
            invalid: {
                color: '#9e2146', // Customize the color for invalid input
            },
        },
    };
    return (
        <form id="payment-form" className="col-xxl-6 col-lg-7 col-md-12 " onSubmit={handleSubmit}>
            <div className="payment-form">
                <div className="row amount-selection">
                    <div className="col payment-amount-left py-2 px-0"><label>
                        <input
                            type="radio"
                            name="amount"
                            value={500} // 500 in cents
                            onChange={(e) => setSelectedAmount(e.target.value)}
                        />
                        $500 (Silver)
                    </label></div>
                    <div className="col payment-amount-right py-2 ">
                        <label>
                            <input

                                type="radio"
                                name="amount"
                                value={1000} // 1000 in cents
                                onChange={(e) => setSelectedAmount(e.target.value)}
                            />
                            $1000 (Gold)
                        </label>
                    </div>

                </div>
                <CardElement className="card-details" id="card-element" options={cardElementOptions} />
                <button className="btn btn-primary" disabled={processing || !stripe || !elements} id="submit">
                    {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
                </button>
                {error && <div className="card-error" role="alert">{error}</div>}
                {succeeded && <p>Payment succeeded!</p>}
            </div>

        </form>
    );
};

export default Payment;
