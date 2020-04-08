import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
//import fakeData from '../../fakeData';
import Product from '../Product/Product';
import { useState } from 'react';

const ProductDetail = () => {
    const { productKey } = useParams();
    //const product = fakeData.find(pd => pd.key = productKey);
    const [product,setProduct]=useState(null);
    useEffect(()=>{
        fetch('http://https://mr-ema-jhon-simple.herokuapp.com/product/'+productKey)
        .then(res=>res.json())
        .then(data=>{
            setProduct(data);
        })
    },[])
    return (
        <div>
            <h2>{productKey} Your Product Details </h2>
            {
             product && <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    )
}

export default ProductDetail;