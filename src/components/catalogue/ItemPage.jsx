import PropTypes from "prop-types";
import {useEffect} from "react";

const ItemPage = (props) => {
    const {
        id,
        title,
        description,
        price,
        photo,
        isNew,
        isSale,
        categories,
        rating
    } = props.item
    const products = props.products
    const categoryList = props.categoryList

    const similarGoods = categories.map(item => {
        return products.filter(value => {
            return value.categories.includes(item) && value.id !== id
        })
    })

    let similarGoodsCounter = 0

    const categoryNames = categories.map(category => {
        return categoryList.filter(item => item.id === category)
    })

    return (
        <div>
            <h4>{title}</h4>
            <img src={ `${photo}?v=${id}` } alt="item photo" />
            <p>{"Novelty: " + isNew}</p>
            <p>{"On Sale: " + isSale}</p>
            <p>{"Price: $" + price}</p>
            <p>{"Rating: " + rating}</p>
            <button>В корзину</button>
            <p>{`Categories: ${categoryNames.map(category => {
                return category.map(item => {
                    if (item.name) return item.name
                    return null
                })
            })}`}</p>

            <p>{"Description: " + description}</p>
            <div>
                <p>Similar Goods:</p>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
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
                                        <div
                                            style={{
                                                width: "14%",
                                                margin: "1%",
                                                border: "1px solid black"
                                            }}
                                             key={i}
                                        >
                                            <img
                                                style={{
                                                    width: "100%"
                                                }}
                                                src={ `${photo}?v=${id}` }
                                            />
                                            <h4>{value.title}</h4>
                                            <p>{value.price}</p>
                                        </div>
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
}

ItemPage.propTypes = {

}

export default ItemPage