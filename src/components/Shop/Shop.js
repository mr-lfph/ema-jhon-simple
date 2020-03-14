import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';


const Shop = () => {

    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart,setCart]=useState([]);

    const handleAddProduct=(product)=>{
        console.log('product added',product);
        const newCart=[...cart,product];
        setCart(newCart);    
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                <h3>{products.length}</h3>
                {
                    products.map(prod =><Product handleAddProduct={handleAddProduct} product={prod}></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}></Cart>
            </div>
        </div>
    );

};

export default Shop;    