import React from 'react';
import PropTypes from "prop-types";
import ProductListItem from "./ProductListItem";

const ProductList = (props) => {
    const products = props.products
    const allProductsAmount = props.allProductsAmount

    return (
        <div>
            <h2>Founded: {products.length} of {allProductsAmount}</h2>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                // marginLeft: "3%",
                // marginRight: "3%"
            }}>
                {products.map(product => {
                    return <ProductListItem
                        key={product.id}
                        product={product}
                        handleActiveItemValue={props.handleActiveItemValue}
                    />
                })}
            </div>
        </div>
    );
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    allProductsAmount: PropTypes.number
}

ProductList.defaultProps = {
    products: [],
    allProductsAmount: 0
}

export default ProductList;