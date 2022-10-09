import React, {memo, useEffect, useMemo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Filters from "./Filters";
import ProductList from "./ProductList";
import { queryState } from "./Query-State";
import { getProductsList, getCategoryList } from "./api";
import ItemPage from "./ItemPage";

const CatalogPage = memo((props => {

    const [products, setProducts] = useState([])
    const [productsQueryStatus, setProductsQueryStatus] = useState(queryState.initial)
    const [productsQueryError, setProductsQueryError] = useState(null)

    const [categoryList, setCategoryList] = useState([])
    const [categoryQueryStatus, setCategoryQueryStatus] = useState(queryState.initial)
    const [categoryQueryError, setCategoryQueryError] = useState(null)

    let [categoryFilters, setCategoryFilters] = useState([])
    const [titleInputValue, setTitleInputValue] = useState("")
    const [minPriceFilter, setMinPriceFilter] = useState(1)
    const [maxPriceFilter, setMaxPriceFilter] = useState(1000)
    const [minRatingFilter, setMinRatingFilter] = useState(1)
    const [maxRatingFilter, setMaxRatingFilter] = useState(100)
    const [isNewFilter, setIsNewFilter] = useState(false)
    const [isSaleFilter, setIsSaleFilter] = useState(false)
    const [isInStockFilter, setIsInStockFilter] = useState(false)

    const [isProductPageActive, setIsProductPageActive] = useState(false)
    const [itemPageId, setItemPageId] = useState(null)

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

    const handleActiveItemValue = useCallback((id) => {
        setIsProductPageActive(!isProductPageActive)
        setItemPageId(id)
    }, [isProductPageActive])

    useEffect(() => {
        loadProductsList()
        loadCategoriesList()
        //@todo Надо посчитать мин и макс прайс и рейтинг
        //@todo Select all должен отображать 100 из 100
    }, [])

    useEffect(() => {
        setDefaultSelectedCategories()
    }, [categoryList, products])

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
            <div className="">
                <div>
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
                <div>
                    {isLoading && (
                        <div>Loading...</div>
                    )}
                    {!isLoading && isSuccess && (
                        <ProductList
                            products={filteredProducts}
                            allProductsAmount={products.length}

                            handleActiveItemValue={handleActiveItemValue}
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
                                    categoryList={categoryList}/>
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