import React, { useEffect, useState } from 'react'
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Rivewitem from '../ReviewItem/ReviewItem';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import '../Shop/shop.css';
import happyImage from '../../images/giphy.gif';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        processOrder(true);
    }
    const removeProduct = (productKey) => {
        console.log('removed click', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);
    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} alt="" />
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <Rivewitem key={pd.key} removeProduct={removeProduct} product={pd}></Rivewitem>)
                }
                {
                    thankyou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="btn-review-order"> Place Order</button>
                </Cart>

            </div>
        </div>
    )
}
export default Review
