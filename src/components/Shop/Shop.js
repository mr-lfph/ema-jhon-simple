import React, { useState } from 'react';
//import fakeData from '../../fakeData';
import './shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {

    // const first10 = fakeData.slice(0, 10);
    //const [products, setProducts] = useState(first10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://mr-ema-jhon-simple.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                // console.log('Data from DataBase',data);
                setProducts(data);
            })
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if (products.length) {
            const previousCart = productKeys.map(existingKey => {
                //fakeData.find(pd => pd.key === existingKey)
                const product = products.find(pd => pd.key === existingKey)
                product.quantity = savedCart[existingKey];
                return product;
            })
            setCart(previousCart);
        }

    }, [products])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];

        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(prod => <Product key={prod.key} showAddToCart={true} handleAddProduct={handleAddProduct} product={prod}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>

                    <Link to="/review">
                        <button className="btn-review-order">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );

};

export default Shop;    