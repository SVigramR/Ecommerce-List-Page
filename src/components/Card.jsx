import { useState, useEffect } from "react";
import card from "/src/styles/card.module.css";
import Quantity from "./Quantity";
import { toast, ToastContainer } from "react-toastify";

function Card({ item, direction, cart, setCart, fadeOut }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // When fadeOut is triggered (page change), hide image before loading new one
        if (fadeOut) {
            setLoaded(false);
        }
    }, [fadeOut]);

    const handleAddToCart = () => {
        const newCart = {
            id: item.id,
            title: item.title,
            price: item.price,
            images: item.images[0],
            category: item.category,
            totalPrice: function () {
                let mul = this.price * this.quantity;
                return mul.toFixed(2);
            },
            quantity: 1,
        };
        const findItem = cart.find((element) => element.id === item.id);
        if (!findItem) {
            setCart([...cart, newCart]);
        }
        toast.success("Added To Cart, Sucessfully!")
    };

    return (
        <div className={direction ? card.card : card.cardHorizontal}>
            <img
                src={Array.isArray(item.images) ? item.images[0] : item.images}
                alt={item.title}
                onLoad={() => setLoaded(true)}
                className={`${loaded ? card.fadeIn : card.fadeOut}`}
            />
            <div className={card.info}>
                <div>
                    <p>{item.title}</p>
                    <p className={card.price}>${item.price}</p>
                </div>
            </div>
            {direction ? (
                <button onClick={handleAddToCart}>Add To Cart</button>
            ) : (
                <Quantity item={item} cart={cart} setCart={setCart} />
            )}
        </div>
    );
}

export default Card;
