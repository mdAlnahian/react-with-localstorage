import React, { useState } from 'react';
import './CartInfo.css';

const CartInfo = ({ item, infos, freeProduct }) => {
  const { name, pairImage, price , quantity } = item;


  return (
    <div>
      <div className="item-container">
        <img className="item-img" src={pairImage} alt="" />
        <h3>{name}</h3>
        <h3>${price}</h3>
        <p>Quantity: {quantity}</p>
      </div>
      {/* <div>
        {freeProduct && (
          <div className="item-container">
            <img className="item-img" src={freeProduct.pairImage} alt="" />
            <h3>{freeProduct.name}</h3>
            <h3>${freeProduct.price}</h3>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default CartInfo;