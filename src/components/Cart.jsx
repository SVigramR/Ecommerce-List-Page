import { useOutletContext } from "react-router-dom";
import cartStyle from '../styles/cart.module.css'
import Card from "./Card";

function Cart() {
    const context = useOutletContext() || {}; 
    const cart = context.cart || []; 
    const setCart = context.setCart || (() => {});

    
    const sumTotal = () => {
        let sum = 0
        for (let index = 0; index < cart.length; index++) {
            const element = cart[index].totalPrice();
            sum += Number(element)
        }
        return sum.toFixed(2)
    }

    const handlePurchase = () => {
        setCart([])
        alert("Order placed, Thank you for Shopping")
    }

    if (!cart || cart.length === 0) {
        return <h2 className={cartStyle.cartPage}>Add Items to the Cart</h2>;
    }
    // if (cart.length) {
        return (
            <>
                <div className={cartStyle.cartPage}>
                    <div className={cartStyle.cartCards}>
                        {cart.map((item, index) => {
                            return (
                                <>
                                    <Card key={index} item={item} direction={false} cart={cart} setCart={setCart} />
                                </  >
                            )
                        })}
                    </div>
                    <div>${sumTotal()}</div>
                    <button className={cartStyle.payout} onClick={handlePurchase}>PAYOUT</button>
                </div>
            </>
        ) 
}

export default Cart;