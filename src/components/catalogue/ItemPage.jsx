import PropTypes from "prop-types";
import {memo} from "react";
import {Box, Card, CardMedia, CardContent, Typography, Button} from "@mui/material";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useCart} from "../../redux/hooksCart";
import {useProducts} from "../../redux/hooksProducts";

const ItemPage = memo(() => {
    const { id } = useParams()
    const {cartList, redactItemCart} = useCart()
    const {products} = useProducts()
    const categoryList = useSelector(state => state.categories)
    const itemPageProduct = products.filter(product => product.id === id)

    const {
        title,
        description,
        price,
        photo,
        isNew,
        isSale,
        categories,
        rating
    } = itemPageProduct[0]

    const similarGoods = categories.map(item => {
            return products.filter(value => {
                return value.categories.includes(item) && value.id !== id
            })
        })

    let similarGoodsCounter = 0

    const categoryNames = categories.map(category => {
        return categoryList.filter(item => item.id === category)
    })

    const handleCartItems = () => {
        redactItemCart(id)
    }

    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    padding: "0 10%",
                    margin: "30px auto"
            }}
            >
                <Box sx={{width: "35%"}}>
                    <img style={{width: "100%"}} src={ `${photo}?v=${id}` } alt="item photo" />
                </Box>
                <Box sx={{
                    width: "50%",
                    paddingLeft: "10%"
                    }}
                >
                    <Typography sx={{marginBottom: "30px"}} variant="h3" component="h3">
                        {title}
                    </Typography>
                    <Typography variant="h6" component="p">
                        {"Novelty: " + isNew}
                    </Typography>
                    <Typography variant="h6" component="p">
                        {"On Sale: " + isSale}
                    </Typography>
                    <Typography variant="h6" component="p">
                        {"Price: $" + price}
                    </Typography>
                    <Typography variant="h6" component="p">
                        {"Rating: " + rating}
                    </Typography>
                    <Button onClick={handleCartItems}>
                        {!cartList.has(id) ? "Add to cart" : "Remove"}
                    </Button>
                    <Typography variant="h6" component="h2">{`Categories: ${categoryNames.map(category => {
                        return category.map(item => {
                            if (item.name) return item.name
                            return null
                        })
                    })}`}</Typography>
                    <Typography variant="body1" component="p">
                        {"Description: " + description}
                    </Typography>
                </Box>
            </Box>
            <div>
                <Typography
                    variant="h6"
                    component="p"
                    sx={{
                        marginLeft: "25px",
                        marginBottom: "10px",
                    }}
                >
                    You also could be interested in:
                </Typography>
                <Box sx={{
                    display: "grid",
                    gap: "20px",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                    margin: "0 25px"
                }}
                >
                    {
                        similarGoods.map(item => {
                            if (similarGoodsCounter > 6) {
                                return null
                            }
                            return item.map(value => {
                                if (similarGoodsCounter < 6 && value.isInStock) {
                                    similarGoodsCounter++
                                    return (
                                        <Box key={value.id}>
                                            <Card>
                                                <Link to={`/product/${value.id}`}>
                                                    <CardMedia
                                                        component="img"
                                                        height="100%"
                                                        image={`${value.photo}?v=${value.id}`}
                                                        alt="item"
                                                    />
                                                </Link>
                                                <CardContent>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h6"
                                                        component="h6"
                                                    >
                                                        {value.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {`${"Price: " + value.price + "$"}`}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    )
                                }
                                return null
                            })
                        })
                    }
                </Box>
            </div>
        </div>
    )
})

ItemPage.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    photo: PropTypes.string,
    isNew: PropTypes.bool,
    isSale: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    products: PropTypes.arrayOf(PropTypes.object),
    categoryList: PropTypes.arrayOf(PropTypes.object)
}

export default ItemPage