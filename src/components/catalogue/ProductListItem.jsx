import React, {memo, useCallback} from 'react';
import PropTypes from "prop-types";
import {Box, Card, CardMedia, CardContent, Typography, Button, CardActions} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FiberNewSharpIcon from '@mui/icons-material/FiberNewSharp';
import SellIcon from '@mui/icons-material/Sell';
import Rating from '@mui/material/Rating';

const ProductListItem = memo((props => {
    const {
        id,
        createdAt,
        title,
        description,
        price,
        photo,
        isNew,
        isSale,
        isInStock,
        categories,
        rating,
        handleIsProductPageActiveValue,
        handleCartProductsValue,
        cartList
    } = props

    const onClickCartProductsValue = useCallback(() => {
        handleCartProductsValue(id)
    }, [])

    const cartProducts = useSelector((state) => {
        // state.cartProducts
        return state.cartList
    })

    return (
        <Box>
            <Card>
                <CardMedia
                    component="img"
                    height="100%"
                    image={`${photo}?v=${id}`}
                    alt="item"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {/*{"Novelty: " + isNew}*/}
                        {
                            isNew
                            ?
                            <FiberNewSharpIcon color="success" fontSize="large" sx={{marginRight: "10px"}}/>
                            :
                            null
                        }
                        {
                            isSale
                            ?
                            <SellIcon color="warning" fontSize="large" />
                            :
                            null
                        }
                    </Typography>
                    <Typography sx={{margin: "10px 0"}} variant="body1" color="text.secondary">
                        {`${"Price: " + price + "$"}`}
                    </Typography>
                    <Rating name="read-only" value={rating / 20} precision={0.5} readOnly />
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={onClickCartProductsValue}>
                        {!cartProducts.has(id) ? "Add to cart" : "Remove"}
                    </Button>
                    <Button to={`/product/${id}`} LinkComponent={Link} size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Box>
    );
}))

ProductListItem.propTypes = {
    id: PropTypes.string,
    createdAt: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    photo: PropTypes.string,
    isNew: PropTypes.bool,
    isSale: PropTypes.bool,
    isInStock: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
}

ProductListItem.defaultProps = {
    id: "",
    createdAt: "",
    title: "",
    description: "",
    price: "",
    photo: "",
    isNew: false,
    isSale: false,
    isInStock: false,
    categories: [],
    rating: 0,
}

export default ProductListItem;