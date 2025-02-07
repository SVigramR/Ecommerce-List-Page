    // import quant from '/src/styles/quantity.module.css'
    // import { useState } from "react";

    // function Quantity({ item, cart, setCart }) {
    //     const [quantity, setQuantity] = useState(1);
    
    //     const increment = () => {
    //         setQuantity((countValue) => countValue + 1);
    //     }
    //     const decrement = () => setQuantity((countValue) => countValue - 1);

    //     const handleCart = () => {
    //             const findItem = cart.find((element) => element.id === item.id)
    //             const currentCartIndex = cart.findIndex((todo) => todo.id === item.id); 
    //             const updatedCart = { ...findItem, quantity: findItem.quantity + quantity };
    //             const appendCart = [
    //                 ...cart.slice(0, currentCartIndex),
    //                 updatedCart,
    //                 ...cart.slice(currentCartIndex + 1)
    //             ];
    //             setCart(appendCart)
    //     }

    //     return (
    //         <>
    //             <div className={quant.quant}>
    //                 <div className={quant.count}>
    //                     <button disabled={quantity <= 0} className={quant.quantControl} onClick={decrement}>-</button>
    //                     <p className={quant.result}>{quantity}</p>
    //                     <button  disabled={quantity >= 100} className={quant.quantControl} onClick={increment}>+</button>
    //                 </div>
    //             </div>
    //         </>
    //     )
    // }

    // export default Quantity;


    import quant from '/src/styles/quantity.module.css';
    import { useState, useEffect } from 'react';
    
    function Quantity({ item, cart, setCart }) {
        const findItem = cart.find((element) => element.id === item.id);
        const [quantity, setQuantity] = useState(findItem?.quantity || 1);
    
        useEffect(() => {
            if (findItem && findItem.quantity !== quantity) {
                setCart((prevCart) =>
                    prevCart.map((cartItem) =>
                        cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
                    )
                );
            }
        }, [quantity]); 
    
        const increment = () => setQuantity((countValue) => Math.min(countValue + 1, 100));
        const decrement = () => setQuantity((countValue) => Math.max(countValue - 1, 0));
    
        return (
            <div className={quant.quant}>
                <div className={quant.count}>
                    <button disabled={quantity <= 0} className={quant.quantControl} onClick={decrement}>-</button>
                    <p className={quant.result}>{quantity}</p>
                    <button disabled={quantity >= 100} className={quant.quantControl} onClick={increment}>+</button>
                </div>
            </div>
        );
    }
    
    export default Quantity;
    