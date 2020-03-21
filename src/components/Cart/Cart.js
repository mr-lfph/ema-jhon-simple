import React from 'react';

import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    //const total=cart.reduce((total,prd)=>total+prd.price,0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 7.99
    }

    const tax = total / 6;
    const grandTotal = (Number(total) + Number(shipping + tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }


    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered {cart.length}</p>
            <p>Product Price :{total.toFixed(2)}</p>
            <p><small> Shipping cost  : {shipping}</small></p>
            <p><small>Tax + Vat : {formatNumber(tax)}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br/>
            {
            props.children
            /* <Link to="/review">  
             <button className="btn-review-order">Review Order</button>
            </Link> */}
 
        </div>
    );
};

export default Cart;