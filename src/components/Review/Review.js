import React, { useEffect, useState } from 'react'
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Rivewitem from '../ReviewItem/ReviewItem';
import fakeData from '../../fakeData';

const Review = () => {
    const [cart, setCart] = useState([]);
    const  removeProduct=(productKey)=>{
        console.log('removed click',productKey);
        const newCart=cart.filter(pd => pd.key !==productKey)
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
    }, [])
    return (
        <div>
            <h2>Cart Items : {cart.length}</h2>
            {
                cart.map(pd => <Rivewitem key={pd.key} removeProduct={removeProduct} product={pd}></Rivewitem>)
            }
        </div>
    )
}
export default Review
