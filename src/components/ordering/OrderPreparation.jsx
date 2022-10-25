import {memo, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import OrderMainForm from "./OrderMainForm";
import FinalOrderPage from "./FinalOrderPage";
import {Typography} from "@mui/material";

const OrderPreparation = memo(props => {
    const {
        cartList,
        totalSum,
        formFieldsValue
    } = props

    console.log(cartList, totalSum, formFieldsValue)

    const products = useSelector(state => state.products)
    const formFieldsEntries = Object.entries(formFieldsValue)
    const [isActiveFinalOrderPage, setIsActiveFinalOrderPage] = useState(false)
    const [isActiveFormPage, setIsActiveFormPage] = useState(false)
    const dispatch = useDispatch()

    const handleFinalOrderPage = useCallback(() => {
        setIsActiveFinalOrderPage(!isActiveFinalOrderPage)
        dispatch({
            type: "setOrderId",
        })
    }, [])

    const handleIsActiveFormPage = useCallback(() => {
        setIsActiveFormPage(!isActiveFormPage)
    }, [])

    console.log(products, cartList)

    return(
        !isActiveFormPage && !isActiveFinalOrderPage
        ?
        <div>
            <div style={{
                padding: "0 150px",
                margin:"30px",
            }}>
            {
                products.map(product => {
                    if (cartList.has(product.id)) {
                        return (
                            <div
                                key={product.id}
                                style={{
                                    display: "flex",
                                    width: "100%",
                                }}
                            >
                                <div
                                    style={{
                                        width: "60%",
                                        marginRight: "100px",
                                    }}
                                >
                                    <img
                                        alt="product"
                                        src={`${product.photo}?v=${product.id}`}
                                        style={{
                                            width:"100%"
                                        }}
                                    />
                                </div>
                                <div style={{width: "40%"}}>
                                    <Typography component="h6" variant="h5">{product.title}</Typography>
                                    <Typography component="p" variant="h6">Price: {product.price}$</Typography>
                                    <Typography component="p" variant="h6">Quantity: {cartList.get(product.id)}</Typography>
                                    <Typography component="p" variant="h6">Sum: {cartList.get(product.id) * product.price}$</Typography>
                                </div>
                            </div>
                        )
                    }
                    return null
                })
            }
            </div>
            <div style={{
                marginTop: "40px"
            }}>
                {
                    formFieldsEntries.map(formValue => {
                        return <p key={formValue[0]}>{formValue[0] + ": " + formValue[1]}</p>
                    })
                }
            </div>
            <p>totalSum: {totalSum}$</p>
            <div>
                <button onClick={handleIsActiveFormPage}>Edit Order</button>
                <button onClick={handleFinalOrderPage}>Make Order</button>
            </div>
        </div>
        :
        isActiveFormPage
        ?
        <OrderMainForm/>
        :
        isActiveFinalOrderPage
        ?
        <FinalOrderPage/>
        :
        null
    )
})

export default OrderPreparation