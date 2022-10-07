import React, { memo } from 'react';
import PropTypes from "prop-types";

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
        handleActiveItemValue
    } = props

    const onClickIsItemActiveValue = () => {
        handleActiveItemValue(id)
    }

    return (
        <div
            style={{
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