import React, {memo, useEffect, useMemo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Filters from "./Filters";
import ProductList from "./ProductList";
import { queryState } from "./Query-State";
import { getProductsList, getCategoryList } from "./api";
import ItemPage from "./ItemPage";

import {cart} from "../Stores/ReduxStore";
import {Provider, useDispatch, useSelector} from "react-redux";

const CatalogPage = memo((props => {

    const [products, setProducts] = useState([])
    const [productsQueryStatus, setProductsQueryStatus] = useState(queryState.initial)
    const [productsQueryError, setProductsQueryError] = useState(null)

    const [categoryList, setCategoryList] = useState([])
    const [categoryQueryStatus, setCategoryQueryStatus] = useState(queryState.initial)
    const [categoryQueryError, setCategoryQueryError] = useState(null)

    let [categoryFilters, setCategoryFilters] = useState([])
    const [titleInputValue, setTitleInputValue] = useState("")
    const [minPriceFilter, setMinPriceFilter] = useState(-Infinity)
    const [maxPriceFilter, setMaxPriceFilter] = useState(Infinity)
    const [minRatingFilter, setMinRatingFilter] = useState(Infinity)
    const [maxRatingFilter, setMaxRatingFilter] = useState(-Infinity)

    const [lowestPrice, setLowestPrice] = useState(null)
    const [highestPrice, setHighestPrice] = useState(null)
    const [lowestRating, setLowestRating] = useState(null)
    const [highestRating, setHighestRating] = useState(null)

    const [isNewFilter, setIsNewFilter] = useState(false)
    const [isSaleFilter, setIsSaleFilter] = useState(false)
    const [isInStockFilter, setIsInStockFilter] = useState(false)

    const [isProductPageActive, setIsProductPageActive] = useState(false)
    const [itemPageId, setItemPageId] = useState(null)

    let [cartList, setCartList] = useState([])

    ///////////////////////////////////////////////////////////////////////////////

    const handleCartList = useSelector((globalState) => {
        return globalState.cartProducts.cartList
    })

    const dispatch = useDispatch()

    const handleProductsCategoriesToReduxStore = () => {
        dispatch({
            type: "products",
            products: products
        })
        // dispatch( {
        //     type: "categories",
        //     products: products
        //     }
        // )
    }

    ////////////////////////////////////////////////////////////////////////////////

    const handleCartProductsValue = useCallback((id) => {
        if (cartList.includes(id)) {
            cartList = cartList.filter(cart => cart !== id)
        }   else {
            cartList = [...cartList, id]
        }
        setCartList(cartList)
        dispatch({
            type: "plus",
            cartList: cartList
        })
    }, [])

    const handleInputTitle = useCallback((titleInputValue) => {
        setTitleInputValue(titleInputValue)
    }, [])

    const handlePriceValue = useCallback((minPriceFilter, maxPriceFilter) => {
        setMinPriceFilter(minPriceFilter)
        setMaxPriceFilter(maxPriceFilter)
    }, [])

    const handleRatingValue = useCallback((minRatingFilter, maxRatingFilter) => {
        setMinRatingFilter(minRatingFilter)
        setMaxRatingFilter(maxRatingFilter)
    }, [])

    const handleIsNewValue = useCallback((isNewFilter) => {
        setIsNewFilter(isNewFilter)
    }, [])

    const handleIsSaleValue = useCallback((isSaleFilter) => {
        setIsSaleFilter(isSaleFilter)
    }, [])

    const handleIsInStockValue = useCallback((isInStockFilter) => {
        setIsInStockFilter(isInStockFilter)
    }, [])

    const handleCategoryType = useCallback((id) => {
        if (categoryFilters.includes(id)) {
            categoryFilters = categoryFilters.filter(item => item !== id)
        }
        else {
            categoryFilters = [...categoryFilters, id]
        }
        setCategoryFilters(categoryFilters)
    }, [categoryFilters])

    const setDefaultSelectedCategories = useCallback(() => {
        const categoryFilters = []
        categoryList.map(category => {
            categoryFilters.push(category.id)
        })
        setCategoryFilters(categoryFilters)
    }, [categoryList])

    const handleIsProductPageActiveValue = useCallback((id, pageState) => {
        if (pageState !== true) setIsProductPageActive(true)
        // setIsProductPageActive(true)
        setItemPageId(id)
    }, [isProductPageActive])

    useEffect(() => {
        loadProductsList()
        loadCategoriesList()
        //@todo Select all должен отображать 100 из 100
    }, [])

    useEffect(() => {
        handleProductsCategoriesToReduxStore()
        setDefaultSelectedCategories()
        handlePriceRanges()
        handleRatingRanges()
    }, [categoryList, products])

    const handlePriceRanges = useCallback(() => {
        let lowestPrice = Infinity
        let highestPrice = -Infinity

        products.map(product => {
            if (lowestPrice > +product.price) lowestPrice = +product.price
            if (highestPrice < +product.price) highestPrice = +product.price
        })

        setMinPriceFilter(lowestPrice)
        setMaxPriceFilter(highestPrice)
        setLowestPrice(lowestPrice)
        setHighestPrice(highestPrice)
    },[products])

    const handleRatingRanges = () => {
        let lowestRating = Infinity
        let highestRating = -Infinity

        products.map(product => {
            if (lowestRating > product.rating) lowestRating = product.rating
            if (highestRating < product.rating) highestRating = product.rating
        })

        setMinRatingFilter(lowestRating)
        setMaxRatingFilter(highestRating)
        setLowestRating(lowestRating)
        setHighestRating(highestRating)
    }

    const loadProductsList = useCallback(() => {
        setProductsQueryStatus(queryState.loading)
        getProductsList().then((productList => {
            setProducts(productList)
            setProductsQueryStatus(queryState.success)
            setProductsQueryError(null)
        })).catch(error => {
            setProductsQueryStatus(queryState.error)
            setProductsQueryError(error)
        })
    }, [])

    const loadCategoriesList = useCallback(() => {
        setCategoryQueryStatus(queryState.loading)
        getCategoryList().then((categoryList => {
            setCategoryList(categoryList)
            setCategoryQueryStatus(queryState.success)
            setCategoryQueryError(null)
        })).catch(error => {
            setCategoryQueryStatus(queryState.error)
            setCategoryQueryError(error)
        })
    }, [])

    const isLoading = useMemo(() =>
        productsQueryStatus === queryState.loading
        ||
        productsQueryStatus === queryState.initial
        , [productsQueryStatus])
    const isSuccess = useMemo(() => productsQueryStatus === queryState.success, [productsQueryStatus])
    const isError = useMemo(() => productsQueryStatus === queryState.error, [productsQueryStatus])

    const filteredProducts = useMemo(() => products.filter(product => {
                let isPassed = true

                isPassed = !!product.categories.filter(category => categoryFilters.includes(category)).length

                if (titleInputValue.trim()) {
                    let isMatch = product.title.toLowerCase().includes(titleInputValue.toLowerCase())
                    isPassed = isPassed && isMatch
                }

                if (isPassed) {
                    const price = parseFloat(product.price)
                    isPassed = isPassed && (
                        price >= minPriceFilter && price <= maxPriceFilter
                    )
                }

                if (isPassed) {
                    const rating = +product.rating
                    isPassed = isPassed && (
                        rating >= minRatingFilter && rating <= maxRatingFilter
                    )
                }

                if (isPassed && isNewFilter) {
                    isPassed = isPassed && product.isNew
                }

                if (isPassed && isSaleFilter) {
                    isPassed = isPassed && product.isSale
                }

                if (isPassed && isInStockFilter) {
                    isPassed = isPassed && product.isInStock
                }

                return isPassed
            }
        ), [categoryFilters, titleInputValue, minPriceFilter, maxPriceFilter, minRatingFilter, maxRatingFilter, isNewFilter, isSaleFilter, isInStockFilter])

    return (
        !isProductPageActive
            ?
            <div style={{
                display: "flex"
            }}>
                <div
                    style={{
                        width: "15%",
                        padding: "15px"
                    }}
                >
                    <Filters
                        titleInputValue={titleInputValue}
                        categoryList={categoryList}
                        handleCategoryType={handleCategoryType}
                        categoryFilters={categoryFilters}
                        setDefaultSelectedCategories={setDefaultSelectedCategories}
                        minPriceFilter={minPriceFilter}
                        maxPriceFilter={maxPriceFilter}
                        minRatingFilter={minRatingFilter}
                        maxRatingFilter={maxRatingFilter}

                        lowestPrice={lowestPrice}
                        highestPrice={highestPrice}
                        lowestRating={lowestRating}
                        highestRating={highestRating}

                        isNewFilter={isNewFilter}
                        isSaleFilter={isSaleFilter}
                        isInStockFilter={isInStockFilter}
                        handleInputTitle={handleInputTitle}
                        handlePriceValue={handlePriceValue}
                        handleRatingValue={handleRatingValue}
                        handleIsNewValue={handleIsNewValue}
                        handleIsSaleValue={handleIsSaleValue}
                        handleIsInStockValue={handleIsInStockValue}
                    />
                </div>
                <div
                    style={{
                        width: "85%"
                    }}
                >
                    {isLoading && (
                        <div>Loading...</div>
                    )}
                    {!isLoading && isSuccess && (
                        <ProductList
                            products={filteredProducts}
                            allProductsAmount={products.length}

                            handleIsProductPageActiveValue={handleIsProductPageActiveValue}
                            //////////////////////////////////////////////////
                            handleCartProductsValue={handleCartProductsValue}
                            cartList={cartList}
                        />
                    )}
                    {!isLoading && isError && (
                        <div>
                            {productsQueryError?.message || "Something went wrong"}
                        </div>
                    )}
                </div>

            </div>
            :
            isProductPageActive
                ?
                <div>
                    {
                        products
                            .filter(product => product.id === itemPageId)
                            .map(item => {
                                return <ItemPage
                                    key={item.id}

                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    photo={item.photo}
                                    isNew={item.isNew}
                                    isSale={item.isSale}
                                    categories={item.categories}
                                    rating={item.rating}

                                    products={products}
                                    categoryList={categoryList}

                                    ////////////////////////////////
                                    handleCartProductsValue={handleCartProductsValue}
                                    cartList={cartList}
                                    itemPageId={itemPageId}
                                    handleIsProductPageActiveValue={handleIsProductPageActiveValue}
                                />
                            })
                    }
                </div>
                :
                null
    );
}))

CatalogPage.propTypes = {

}

CatalogPage.defaultProps = {

}

export default CatalogPage;