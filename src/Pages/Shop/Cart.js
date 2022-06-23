import React from 'react';
import './Cart.css';

const Cart = ({ info, handleAddToCart }) => {
  const { name, color, pairImage, price } = info;
   
//   const item = infos[0];
 

  return (
    <div className="cart-container">
      <div>
        <img className="cart-image" src={pairImage} alt="" />
      </div>
      <h2 className="cart-container-data">{name}</h2>
      <h2 className="cart-container-data">Color: {color}</h2>
      <h3 className="cart-container-data">Price: $ {price}</h3>
      <button className="cart-btn" onClick={() => handleAddToCart(info)}>
        Add To Cart 🤍
      </button>
    </div>
  );
};

export default Cart;