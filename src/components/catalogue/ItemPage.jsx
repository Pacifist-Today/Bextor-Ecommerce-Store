import PropTypes from "prop-types";
import {memo, useCallback, useMemo, useState} from "react";
import OrderMainForm from "../ordering/OrderMainForm";
import {Box, Card, CardMedia, CardContent, Typography, Button, CardActions, Paper} from "@mui/material";
import {useParams} from "react-router";
import {useSelector} from "react-redux";

const ItemPage = memo((props => {
    // const {
    //     id,
    //     title,
    //     description,
    //     price,
    //     photo,
    //     isNew,
    //     isSale,
    //     categories,
    //     rating,
    //     handleCartProductsValue,
    //     cartList,
    //     itemPageId,
    //     handleIsProductPageActiveValue,
    // } = props

    const { id } = useParams()

    const productsList = useSelector(state => {
        console.log(state)
        return state.products.products
    })

    console.log(productsList)

    console.log(id)

    const [isOrderMainFormActive, setOrderMainFormActive] = useState(false)

    const onClickOrderMainPage = () => {
        setOrderMainFormActive(!isOrderMainFormActive)
    }

    const products = useMemo(() => props.products, [])
    const categoryList = useMemo(() => props.categoryList, [])

    const similarGoods = useMemo(() =>
        categories.map(item => {
            return products.filter(value => {
                return value.categories.includes(item) && value.id !== id
            })
        })
    , [])

    let similarGoodsCounter = 0

    const categoryNames = useMemo(() =>
        categories.map(category => {
        return categoryList.filter(item => item.id === category)
    }), [])

    const onClickCartProductsValue = useCallback(() => {
        handleCartProductsValue(id)
    }, [])

    const onClickShowAnotherProductPage = ({target}) => {
        const productId = target.dataset.productid
        const activePage = true
        handleIsProductPageActiveValue(productId, activePage)
    }

    console.log(cartList)

    return (
        !isOrderMainFormActive
        ?
        <div>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    padding: "10px 35px"
            }}
            >
                <div style={{width: "40%"}}>
                    <img style={{width: "100%"}} src={ `${photo}?v=${id}` } alt="item photo" />
                </div>
                <div style={{width: "50%"}}>
                    <Typography variant="h3" component="h3">
                        {title}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {"Novelty: " + isNew}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {"On Sale: " + isSale}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {"Price: $" + price}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {"Rating: " + rating}
                    </Typography>
                    <Button onClick={onClickOrderMainPage}>Оформить заказ</Button>
                    <Button onClick={onClickCartProductsValue}>
                        {!cartList.includes(id) ? "Add to cart" : "Remove"}
                    </Button>
                    <Typography variant="body2" component="h2">{`Categories: ${categoryNames.map(category => {
                        return category.map(item => {
                            if (item.name) return item.name
                            return null
                        })
                    })}`}</Typography>
                    <Typography variant="body1" component="p">
                        {"Description: " + description}
                    </Typography>
                </div>
            </div>
            <div>
                <Typography
                    variant="h6"
                    component="p"
                    style={{
                        marginLeft: "25px",
                        marginBottom: "10px",
                    }}
                >
                    You also could be interested in:
                </Typography>
                <div style={{

                    display: "grid",
                    gap: "20px",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                    margin: "0 25px"
                }}
                >
                    {
                        similarGoods.map(item => {
                            if (similarGoodsCounter > 6) {
                                return null
                            }
                            return item.map((value, i) => {
                                if (similarGoodsCounter < 6 && value.isInStock) {
                                    similarGoodsCounter++
                                    return (
                                        // <div
                                        //     style={{
                                        //         width: "14%",
                                        //         margin: "1%",
                                        //         border: "1px solid black"
                                        //     }}
                                        //     key={i}
                                        // >
                                        //     <img
                                        //         style={{
                                        //             width: "100%"
                                        //         }}
                                        //         src={ `${value.photo}?v=${value.id}` }
                                        //         onClick={onClickShowAnotherProductPage}
                                        //         data-productid={value.id}
                                        //     />
                                        //     <h4 onClick={onClickShowAnotherProductPage} data-productid={value.id}>{value.title}</h4>
                                        //     <p>{value.price}</p>
                                        //
                                        // </div>
                                        <Box key={value.id} style={{}}>
                                            <Card>
                                                <CardMedia
                                                    component="img"
                                                    height="100%"
                                                    image={`${value.photo}?v=${value.id}`}
                                                    alt="item"
                                                    data-productid={value.id}
                                                    onClick={onClickShowAnotherProductPage}
                                                />
                                                <CardContent>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h6"
                                                        component="h6"
                                                        data-productid={value.id}
                                                        onClick={onClickShowAnotherProductPage}
                                                    >
                                                        {value.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {`${"Price: " + value.price + "$"}`}
                                                    </Typography>
                                                </CardContent>
                                                {/*<CardActions>*/}
                                                {/*    <Button size="small" onClick={onClickCartProductsValue}>*/}
                                                {/*        {!cartList.includes(value.id) ? "Add to cart" : "Remove"}*/}
                                                {/*    </Button>*/}
                                                {/*</CardActions>*/}
                                            </Card>
                                        </Box>
                                    )
                                }
                                return null
                            })
                        })
                    }
                </div>
            </div>
        </div>
            :
            <OrderMainForm />
    )
}))

ItemPage.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    photo: PropTypes.string,
    isNew: PropTypes.bool,
    isSale: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    products: PropTypes.arrayOf(PropTypes.object),
    categoryList: PropTypes.arrayOf(PropTypes.object)
}

export default ItemPage