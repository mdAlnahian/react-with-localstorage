import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import CartInfo from './CartInfo';
import './Shop.css';
import { addToLocalStorage, getFromLocalStorage , clearLocalStorage } from "./Utils";

const Shop = () => {

    const [infos , setInfos ] = useState([]);
    const [cart , setCart ] = useState([]);
    const [freeProduct, setFreeProduct] = useState({});
    const [offer , setOffer] = useState(false);

    useEffect(()=>{
      if(cart.length > 0){
        setOffer(true);
      }else{
        setOffer(false);
      }
    },[cart])
    

    useEffect(() => {
      fetch("data.json")
        .then((res) => res.json())
        .then((data) => setInfos(data));
    //   console.log(infos);
    }, []);
  
    const handleAddToCart = (selectedItem) =>{

        let newCart = [];
        const exist = cart.find(product => product.id == selectedItem.id );
        if(!exist){
          selectedItem.quantity = 1;
          newCart = [ ...cart , selectedItem];
        }else{
          // selectedItem.quantity = selectedItem.quantity + 1;
          // newCart = [...cart, selectedItem];
          const rest = cart.filter(product => product.id !== selectedItem.id);
          selectedItem.quantity = selectedItem.quantity + 1;
          newCart = [...rest, selectedItem];
        }
        addToLocalStorage(selectedItem.id);
        setCart(newCart);
    }

    const handleClearCart = () => {
      setCart([]);
      setFreeProduct([]);
      clearLocalStorage();
    }

    const handleOffer = () =>{
        const randomNumber = Math.floor(Math.random() * infos.length);
        const freeItem = infos[randomNumber];
        // console.log(freeItem);
        setFreeProduct(freeItem);
        // console.log(freeProduct);
    }

    //uses of getfromLocalstorageFunction to establish a relation between localstorage and frontend
    useEffect(()=>{
      if(infos.length){
        const storedProductsIds = getFromLocalStorage();
        console.log(storedProductsIds);

        const previousCart = [];

        for(const id in storedProductsIds){
          // console.log(id);
          const foundProduct = infos.find((product) => product.id == id);
          // console.log(foundProduct);
          if(foundProduct){
            const quantity = storedProductsIds[id];
            foundProduct.quantity = quantity ;
            previousCart.push(foundProduct);
          }
          setCart(previousCart)
        }
      }
    },[infos])

    return (
      <div className="shop-container">
        <div className="shop-container-data">
          <div className="all-products">
            {infos.map((info) => (
              <Cart
                key={info.id}
                info={info}
                // infos={infos}
                handleAddToCart={handleAddToCart}
              ></Cart>
            ))}
          </div>
        </div>
        <div className="shop-container-cart">
          <h2>
            {" "}
            Your Total Cart products {cart.length}{" "}
            <span className="clear" onClick={handleClearCart}>
              ❌
            </span>
          </h2>
          <div>
            {cart.map((item, index) => (
              <CartInfo
                key={index}
                item={item}
                infos={infos}
                freeProduct={freeProduct}
              ></CartInfo>
            ))}
          </div>
          <button
            onClick={handleOffer}
            className={offer ? "offer-btn" : "offer-btn-disabled"}
            disabled={!offer}
          >
            Get One For Free
          </button>
          <div>
            {Object.keys(freeProduct).length > 0 && (
              <div>
                <div className="item-container">
                  <img
                    className="item-img"
                    src={freeProduct.pairImage}
                    alt=""
                  />
                  <h3>{freeProduct.name}</h3>
                  {/* <h3>${freeProduct.price}</h3> */}
                  {/* <p>Quantity: {freeProduct.quantity}</p> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default Shop;