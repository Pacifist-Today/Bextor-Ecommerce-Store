import {memo, useCallback, useState} from "react";
import {Button, Typography, Card, Box} from "@mui/material";
import OrderMainForm from "../ordering/OrderMainForm";
import {useCart} from "../../redux/hooksCart"
import {useProducts} from "../../redux/hooksProducts";
import {NavLink} from "react-router-dom";

const CartPage = memo(() => {
    const {insertItemCart, redactItemCart, deductItemCart, cartList} = useCart()
    const {products} = useProducts()
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
        insertItemCart(id)
    }

    const onClickSubQuantity = (e) => {
        const id = e.target.dataset.productcartid
        deductItemCart(id)
    }

    const onClickSetProductInCart = (e) => {
        const id = e.target.dataset.productcartid
        redactItemCart(id)
    }

    console.log(cartList.length)

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
                flexDirection: "column",
                marginTop: "1%"
            }}>
                {
                    cartList.size
                ?
                    products.map(product => {
                        for (let cartItem of cartList) {
                            if(product.id === cartItem[0]) {
                                return (
                                    <Card
                                        key={product.id}
                                        style={{
                                            margin: "1% 10%",
                                            display: "flex",
                                        }}
                                    >
                                        <div style={{width:"30%"}}>
                                            <img
                                                alt="product"
                                                src={`${product.photo}?v=${product.id}`}
                                                style={{
                                                    width: "100%",
                                                    padding: "5%"
                                                }}
                                            />
                                        </div>
                                        <div style={{
                                            marginLeft: "50px",
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "space-between"
                                        }}
                                        >
                                            <Box sx={{width: "40%"}}>
                                                <Typography variant="h6" component="h6" style={{marginTop: "30px"}}>{product.title}</Typography>
                                                <Typography variant="subtitle1" component="p">Price: {product.price}$</Typography>
                                                <Typography variant="subtitle1" component="p">Quantity: {cartItem[1]}</Typography>
                                                <Typography variant="subtitle1" component="p">Sum: {cartItem[1] * product.price}$</Typography>
                                            </Box>
                                            <Box sx={{alignSelf: "center"}}>
                                                <Button data-productcartid={cartItem[0]} onClick={onClickAddQuantity}>+</Button>
                                                <input
                                                    type={"text"}
                                                    disabled={true}
                                                    value={cartItem[1]}
                                                    style={{
                                                        width: "75px",
                                                        textAlign: "center"
                                                    }}
                                                />
                                                <Button data-productcartid={cartItem[0]} onClick={onClickSubQuantity}>-</Button>
                                            </Box>
                                            <Box style={{alignSelf: "flex-end", padding:"0 30px 30px 0"}}>
                                                <Button data-productcartid={cartItem[0]} onClick={onClickSetProductInCart}>Delete</Button>
                                            </Box>
                                        </div>
                                    </Card>
                                )
                            }
                        }
                        return null
                    })
                :
                !cartList.size
                ?
                    <div>
                        <Typography
                            variant="h2"
                            component="p"
                            sx={{
                                textAlign: "center",
                                marginTop: "20%",
                            }}
                        >The cart is empty</Typography>
                        <Typography
                            variant="h4"
                            component="p"
                            sx={{
                                textAlign: "center",
                                marginTop: "2%",
                            }}
                        >You can add some goods to cart in
                            <Button LinkComponent={NavLink} to="/catalog">
                                <Typography variant="h4" component="p">
                                Catalog Page
                                </Typography>
                            </Button>
                        </Typography>

                    </div>
                :
                    null
                }
            </div>
            <Card style={{
                display: "flex",
                flexDirection: "column",
                width:"20%",
                padding: "30px",
                marginTop: "2%",
                marginRight: "10%",
                height: "max-content",
                textAlign: "center"
            }}>
                <div >
                    <p>Total sum: {totalSum}$</p>
                    <p>Products quantity: {productsQuantity}</p>
                </div>
                <Button onClick={handleActiveOrderingForm}>Make order</Button>
            </Card>
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