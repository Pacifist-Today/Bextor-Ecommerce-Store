import React, {memo, useMemo} from 'react';
import PropTypes from "prop-types";
import ProductListItem from "./ProductListItem";

const ProductList = memo((props => {
    let products = useMemo(() => props.products, [])
    const allProductsAmount = useMemo(() => props.allProductsAmount, [])

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