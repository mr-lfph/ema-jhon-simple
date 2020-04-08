import React, { useEffect, useState } from 'react'
import { getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
//import {processOrder } from '../../utilities/databaseManager';
import Rivewitem from '../ReviewItem/ReviewItem';
//import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import '../Shop/shop.css';
//import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';


const Review = () => {
    const [cart, setCart] = useState([]);
   // const [orderPlaced, setOrderPlaced] = useState(false);

    const auth = useAuth();

    // const handlePlaceOrder = () => {
    //     setCart([]);
    //     processOrder(true);
    // }
    const removeProduct = (productKey) => {
        //console.log('removed click', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://mr-ema-jhon-simple.herokuapp.com/getProductByKey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
               // console.log(data);
                
                const cartProducts = productKeys.map(key => {
                    const product = data.find(pd => pd.key === key);
                    product.quantity = savedCart[key];
                    return product;
                });
                setCart(cartProducts);
            })
    }, []);
    // let thankyou;
    // if (orderPlaced) {
    //     thankyou = <img src={happyImage} alt="" />
    // }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <Rivewitem key={pd.key} removeProduct={removeProduct} product={pd}></Rivewitem>)
                }
                {/* {thankyou} */}
                {
                    !cart.length && <h2>Your cart is Empty , <a href="/shop"> Keep Shopping</a> </h2>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="shipment">
                        {auth.user ?
                            <button className="btn-review-order">Proceed Checkout</button>
                            :
                            <button className="btn-review-order">Login to proceed</button>
                        }
                    </Link>
                </Cart>

            </div>
        </div>
    )
}
export default Review
