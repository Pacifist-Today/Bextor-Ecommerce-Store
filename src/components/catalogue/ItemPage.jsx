import PropTypes from "prop-types";
import {memo, useCallback, useMemo, useState} from "react";
import {Box, Card, CardMedia, CardContent, Typography, Button, CardActions, Paper} from "@mui/material";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import FiberNewIcon from '@mui/icons-material/FiberNew';
import {Badge} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail'

const ItemPage = memo((props => {
    const { id } = useParams()

    const cartList = useSelector(state => state.cartProducts)
    const productsList = useSelector(state => state.products)
    const categoryList = useSelector(state => state.categories)

    const itemPageProduct = productsList.filter(product => product.id === id)

    const dispatch = useDispatch()

    const {
        title,
        description,
        price,
        photo,
        isNew,
        isSale,
        categories,
        rating
    } = itemPageProduct[0]

    const similarGoods = categories.map(item => {
            return productsList.filter(value => {
                return value.categories.includes(item) && value.id !== id
            })
        })

    let similarGoodsCounter = 0

    const categoryNames = categories.map(category => {
        return categoryList.filter(item => item.id === category)
    })

    const handleCartItems = () => {
        dispatch({
            type: "cartItem",
            payload: {
                id: id,
                quantity: 1
            }
        })
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    padding: "0 10%",
                    margin: "30px auto"
            }}
            >
                <div style={{width: "35%"}}>
                    <img style={{width: "100%"}} src={ `${photo}?v=${id}` } alt="item photo" />
                </div>
                <div style={{
                    width: "50%",
                    paddingLeft: "10%"
                    }}
                >
                    <Typography style={{marginBottom: "30px"}} variant="h3" component="h3">
                        {title}
                    </Typography>
                    <Typography variant="h6" component="p">
                        {"Novelty: " + isNew}
                    </Typography>
                    <Typography variant="h6" component="p">
                        {"On Sale: " + isSale}
                    </Typography>
                    <Typography variant="h6" component="p">
                        {"Price: $" + price}
                    </Typography>
                    <Typography variant="h6" component="p">
                        {"Rating: " + rating}
                    </Typography>
                    <Button onClick={handleCartItems}>
                        {!cartList.has(id) ? "Add to cart" : "Remove"}
                    </Button>
                    <Typography variant="h6" component="h2">{`Categories: ${categoryNames.map(category => {
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
                                        <Box key={value.id} style={{}}>
                                            <Card>
                                                <Link to={`/product/${value.id}`}>
                                                    <CardMedia
                                                        component="img"
                                                        height="100%"
                                                        image={`${value.photo}?v=${value.id}`}
                                                        alt="item"
                                                        data-productid={value.id}
                                                    />
                                                </Link>
                                                <CardContent>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h6"
                                                        component="h6"
                                                        data-productid={value.id}
                                                    >
                                                        {value.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {`${"Price: " + value.price + "$"}`}
                                                    </Typography>
                                                </CardContent>
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