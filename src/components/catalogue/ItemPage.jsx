import PropTypes from "prop-types";

const ItemPage = (props) => {
    const {
        id,
        title,
        description,
        price,
        photo,
        isNewFilter,
        isSaleFilter,
        categories,
        rating
    } = props

    return (
        <div>
            <h4>{title}</h4>
            <img src={photo} alt="item photo" />
            <p>{"Novelty: " + isNewFilter}</p>
            <p>{"On Sale: " + isSaleFilter}</p>
            <p>{"Price: $" + price}</p>
            <p>{"Rating: " + rating}</p>
            <button>В корзину</button>
            <p>{"Categories: "}</p>
            <p>{"Description: " + description}</p>
            <div>
                <p>Similar Goods:</p>
                <div>
                    {

                    }
                </div>
            </div>
        </div>
    )
}

ItemPage.propTypes = {

}

export default ItemPage