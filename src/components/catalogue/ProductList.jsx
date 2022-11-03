import React, {memo} from 'react';
import PropTypes from "prop-types";
import ProductListItem from "./ProductListItem";
import {Grid, Typography} from "@mui/material";

const ProductList = memo((props => {
    const products = props.products
    const allProductsAmount = props.allProductsAmount
    const handleCartProductsValue = props.handleCartProductsValue
    const cartList = props.cartList

    return (
        <div>
            <Typography variant="h4" component="h6" sx={{margin: "10px 0"}}
                style={{marginLeft: "50px"}}
            >Founded: {products.length} of {allProductsAmount}</Typography>
            <Grid container spacing={2} sx={{padding: "0 50px"}}>
                {products.map(product => {
                    return <ProductListItem
                        key={product.id}
                        id={product.id}
                        createdAt={product.createdAt}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        photo={product.photo}
                        isNew={product.isNew}
                        isSale={product.isSale}
                        isInStock={product.isInStock}
                        categories={product.categories}
                        rating={product.rating}
                        handleIsProductPageActiveValue={props.handleIsProductPageActiveValue}
                        handleCartProductsValue={handleCartProductsValue}
                        cartList={cartList}
                    />
                })}
            </Grid>
        </div>
    );
}))

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    allProductsAmount: PropTypes.number
}

ProductList.defaultProps = {
    products: [],
    allProductsAmount: 0
}

export default ProductList;