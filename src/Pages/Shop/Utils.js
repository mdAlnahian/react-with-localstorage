const getFromLocalStorage = () =>{
    const getDataFromLocalStorage = JSON.parse(localStorage.getItem("Shopping_Cart"));
    return getDataFromLocalStorage;
    
}
// console.log(getFromLocalStorage);


const addToLocalStorage = (id) =>{
    // console.log('localstorage added');
    const exist = getFromLocalStorage();
    let shoppingCart = { };
    if(!exist){
        shoppingCart[id] = 1;
    }else{
        shoppingCart=exist;
        if(shoppingCart[id]){
            const newCount = shoppingCart[id] + 1 ;
            shoppingCart[id] = newCount ; 
        }else{
            shoppingCart[id]= 1;
        }
    }


    localStorage.setItem('Shopping_Cart', JSON.stringify((shoppingCart)))
}

const clearLocalStorage =()=>{
    localStorage.removeItem("Shopping_Cart");
}

export { addToLocalStorage, getFromLocalStorage, clearLocalStorage };