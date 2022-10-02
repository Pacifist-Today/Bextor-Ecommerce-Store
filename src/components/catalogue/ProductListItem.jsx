import React from 'react';
import PropTypes from "prop-types";

const ProductListItem = props => {
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
    } = props.product

    const handleActiveItemValue = props.handleActiveItemValue

    const onClickIsItemActiveValue = () => {
        handleActiveItemValue(id)
    }

    return (
        <div style={{
            width: "23%",
            margin: "1%",
            border: "1px solid black"
        }}
        >
            <img
                style={{
                    width: "100%"
                }}
                src={ `${photo}?v=${id}` }
                alt="Item photo"/>
            <h3 onClick={onClickIsItemActiveValue}>{title}</h3>
            <p>{"Novelty: " + isNew}</p>
            <p>{"On sales: " + isSale}</p>
            <p>{`${"Price: " + price + "$"}`}</p>
            <p>{"Rating: " + rating}</p>
            <button>В корзину</button>
        </div>
    );
}

ProductListItem.propTypes = {
    product: PropTypes.object
}

ProductListItem.defaultProps = {
    product: {}
}

export default ProductListItem;