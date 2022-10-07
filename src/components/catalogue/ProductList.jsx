import React, {memo, useMemo} from 'react';
import PropTypes from "prop-types";
import ProductListItem from "./ProductListItem";

const ProductList = memo((props => {
    let products = props.products
    const allProductsAmount = props.allProductsAmount

    // products = useMemo(() => {
    //     return products
    // }, [products])

    return (
        <div>
            <h2>Founded: {products.length} of {allProductsAmount}</h2>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
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
                        handleActiveItemValue={props.handleActiveItemValue}
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