import React, {memo, useMemo} from 'react';
import PropTypes from "prop-types";
import ProductListItem from "./ProductListItem";

const ProductList = memo((props => {
    const products = props.products
    const allProductsAmount = props.allProductsAmount
    const handleCartProductsValue = props.handleCartProductsValue
    const cartList = props.cartList

    return (
        <div>
            <h2
                style={{marginLeft: "50px"}}
            >Founded: {products.length} of {allProductsAmount}</h2>
            <div style={{
                display: "grid",
                gap: "10px",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                margin: "0 50px"
            }}>
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
            </div>
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