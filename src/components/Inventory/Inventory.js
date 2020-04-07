import React from 'react';
// import fakeData from '../../fakeData';
// import { processOrder } from '../../utilities/databaseManager';

const Inventory = () => {
    const handleAddInventory = () => {
        // const product = fakeData[0];
        // console.log('Before Post',product);
        // fetch('http://localhost:4200/addProduct', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(fakeData)//product --for single 
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //     console.log('Post Successfull',data);           
        // }) 
        const x= <p>Data already loaded !</p>
      return x;
     }
    return (
        <div>
            <h3>Add Inventory to sell more...</h3>
            <button id="btnClick" onClick= {handleAddInventory}>Add inventory</button>
            { handleAddInventory()}
        </div>
    )
}

export default Inventory
