import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee ,faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const Product = (props) => {
    const { img, name, seller, price, stock } = props.product;

    console.log(props);
    

    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h4 >{name}</h4>
                <br />
                <p><small>By: {seller}</small> </p>
                <p>${price}</p>
                <br />
                <p><small>Only {stock} left in stock - Order soon</small></p>
                <button className="add-to-cart" onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>

            </div>

        </div>
    );
};

export default Product;