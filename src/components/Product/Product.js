import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;
 return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h4 > <Link to={"/product/" + key}> {name}</Link> </h4>
                <br />
                <p><small>By: {seller}</small> </p>
                <p>${price}</p>
                <br />
                <p><small>Only {stock} left in stock - Order soon</small></p>
                {
                    props.showAddToCart && <button className="add-to-cart" onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>
                }
            </div>

        </div>
    );
};

export default Product;