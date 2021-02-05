import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import db from '../firebase'
import './PlansScreen.scss'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PUBLISHABLE_KEY } from "../config.json";

function PlansScreen() {
    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)

    useEffect(() => {
        db.collection('products')
        .where('active','==',true)
        .get()
        .then(querySnapshot => {
            const products = {}
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data()
                const priceSnap = await productDoc.ref.collection('prices').get()
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            })
            setProducts(products)
        })
    }, [])

    console.log(products)

    const loadCheckout = async(priceId) => {
        const docRef = await db
            .collection('customers')
            .doc(user.uid)
            .collection('checkout_sessions')
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            })
        
        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data()

            if (error) {
                // inspect Cloud Function logs in the firebase console
                alert(`An error occured:  ${error.message}`)
            }

            if (sessionId) {
                // We have a session, redirect to checkout, Init Stripe
                const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY)
                stripe.redirectToCheckout({ sessionId });
            }
        })
    }

    return (
        <div className="plansScreen">
            {Object.entries(products).map(([productId, productData]) => {
                // TODO: add logic to check if user subscription is active

                return (
                    <div className="plansScreen__plan">
                        <div className="plansScreen__Info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>                            
                        </div>
                        <button onClick={() => loadCheckout(productData.prices.priceId)} className="plansScreen__">
                            Subscribe
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlansScreen
