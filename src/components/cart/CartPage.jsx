import {memo, useCallback, useState} from "react";
import {Provider, useSelector, useDispatch} from "react-redux";
import {logDOM} from "@testing-library/react";
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";
import OrderMainForm from "../ordering/OrderMainForm";
import {cart} from "../Stores/ReduxStore";

const CartPage = memo((props) => {
    const cartList = useSelector((state) => state.cartProducts)
    const products = useSelector((state) => state.products)
    const dispatch = useDispatch()

    const [isActiveOrdering, setIsActiveOrdering] = useState(false)

    const handleActiveOrderingForm = useCallback(() => {
        if (!cartList.size) throw new Error ("Add products to make an order")
        setIsActiveOrdering(!isActiveOrdering)
    }, [])

    const productsQuantity = cartList.size

    let totalSum = 0
    const summarizing = products.map(product => {
        if (cartList.has(product.id)){
            totalSum += product.price * cartList.get(product.id)
        }
    })

    const onClickAddQuantity = (e) => {
        const id = e.target.dataset.productcartid
        dispatch({
            type: "addCartItem",
            payload: {
                id: id
            }
        })
    }

    const onClickSubQuantity = (e) => {
        const id = e.target.dataset.productcartid
        dispatch({
            type: "subCartItem",
            payload: {
                id: id
            }
        })
    }

    const onClickSetProductInCart = (e) => {
        const id = e.target.dataset.productcartid
        dispatch({
            type: "cartItem",
            payload: {
                id: id,
                quantity: 1
            }
        })
    }

    return (
        !isActiveOrdering
        ?
        <div
            style={{
                width:"100%",
                display: "flex"
            }}
        >
            <div style={{
                width:"80%",
                display:"flex",
                flexDirection: "column"
            }}>
                {
                    products.map(product => {
                        for (let cartItem of cartList) {
                            if(product.id === cartItem[0]) {
                                return (
                                    <div key={product.id}>
                                        <div style={{width:"50%"}}>
                                            <img
                                                alt="product"
                                                src={`${product.photo}?v=${product.id}`}
                                                style={{
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h4>{product.title}</h4>
                                            <p>{product.price}$</p>
                                            <p>quantity: {cartItem[1]}</p>
                                            <p>Summ: {cartItem[1] * product.price}$</p>
                                            <button data-productcartid={cartItem[0]} onClick={onClickSetProductInCart}>Delete</button>
                                            <button data-productcartid={cartItem[0]} onClick={onClickAddQuantity}>Plus</button>
                                            <input type={"text"} disabled={true} value={cartItem[1]}/>
                                            <button data-productcartid={cartItem[0]} onClick={onClickSubQuantity}>Minus</button>
                                        </div>
                                    </div>
                                )
                            }
                        }
                        return null
                    })
                }
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                width:"20%",
            }}>
                <div >
                    <p>In Summ: {totalSum}$</p>
                    <p>Products quantity: {productsQuantity}</p>
                </div>
                {/*<Button LinkComponent={NavLink} to="/ordering" >Make order</Button>*/}
                <Button onClick={handleActiveOrderingForm}>Make order</Button>
            </div>
        </div>
        :
        isActiveOrdering
        ?
        <OrderMainForm cartList={cartList} totalSum={totalSum} />
        :
        null
    )
})

export default CartPage