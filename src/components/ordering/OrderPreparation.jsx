import {memo, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import OrderMainForm from "./OrderMainForm";
import FinalOrderPage from "./FinalOrderPage";
import {Card, Typography, Button} from "@mui/material";

const OrderPreparation = memo(props => {
    const {
        cartList,
        totalSum,
        formFieldsValue,
        formFieldsProps
    } = props

    console.log(cartList, totalSum, formFieldsValue, formFieldsProps)

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

    return(
        !isActiveFormPage && !isActiveFinalOrderPage
        ?
        <div style={{display: "flex"}}>
            <div style={{
                padding: "0 5%",
                margin:"3%",
                width: "60%",
            }}>
                <Typography variant="h4" component="p">Your order:</Typography>
            {
                products.map(product => {
                    if (cartList.has(product.id)) {
                        return (
                            <Card
                                key={product.id}
                                style={{
                                    display: "flex",
                                    // width: "100%",
                                    marginTop: "3%",
                                    padding: "40px"
                                }}
                            >
                                <div
                                    style={{
                                        width: "60%",
                                        marginRight: "",
                                    }}
                                >
                                    <img
                                        alt="product"
                                        src={`${product.photo}?v=${product.id}`}
                                        style={{
                                            width:"50%"
                                        }}
                                    />
                                </div>
                                <div style={{width: "40%"}}>
                                    <Typography component="h6" variant="h5">{product.title}</Typography>
                                    <Typography component="p" variant="h6">Price: {product.price}$</Typography>
                                    <Typography component="p" variant="h6">Quantity: {cartList.get(product.id)}</Typography>
                                    <Typography component="p" variant="h6">Sum: {cartList.get(product.id) * product.price}$</Typography>
                                </div>
                            </Card>
                        )
                    }
                    return null
                })
            }
            </div>
            <div style={{
                display:"flex",
                flexDirection:"column",
                marginTop: "3%",
                width:"40%"
                }}
            >
                <Typography variant="h4" component="p">Contact information</Typography>
                <div style={{
                    marginTop: "40px"
                }}>
                    {
                        formFieldsEntries.map(formValue => {
                            return <Typography
                                variant="subtitle1"
                                component="p"
                                key={formValue[0]}>
                                {formValue[0] + ": " + formValue[1]}
                                </Typography>
                        })
                    }
                </div>
                <Typography variant="subtitle1" component="p">totalSum: {totalSum}$</Typography>
                <div>
                    <Button onClick={handleIsActiveFormPage}>Edit Order</Button>
                    <Button onClick={handleFinalOrderPage}>Make Order</Button>
                </div>
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