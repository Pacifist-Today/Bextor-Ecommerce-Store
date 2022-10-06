import React from 'react';
import PropTypes from 'prop-types';
import Filters from "./Filters";
import ProductList from "./ProductList";
import { queryState } from "./Query-State";
import { getProductsList, getCategoryList } from "./api";
import productList from "./ProductList";
import ItemPage from "./ItemPage";

class CatalogPage extends React.PureComponent {
    constructor(props) {

        super(props);
        this.state = {
            products: [],
            productsQueryStatus: queryState.initial,
            productsQueryError: null,

            categoryList:[],
            categoryQueryStatus: queryState.initial,
            categoryQueryError: null,

            categoryFilters: [],

            titleInputValue: "",
            minPriceFilter: 1,
            maxPriceFilter: 1000,
            minRatingFilter: 1,
            maxRatingFilter: 100,
            isNewFilter: false,
            isSaleFilter: false,
            isInStockFilter: false,

            isItemActive: false,
            itemPageId: null
        }
    }

    handleInputTitle = (titleInputValue) => {
        this.setState({
            titleInputValue
        })
    }

    handlePriceValue = (minPriceFilter, maxPriceFilter) => {
        this.setState({
            minPriceFilter,
            maxPriceFilter
        })
    }

    handleRatingValue = (minRatingFilter, maxRatingFilter) => {
        this.setState({
            minRatingFilter,
            maxRatingFilter
        })
    }

    handleIsNewValue = (isNewFilter) => {
        this.setState({
            isNewFilter
        })
    }

    handleIsSaleValue = (isSaleFilter) => {
        this.setState({
            isSaleFilter
        })
    }

    handleIsInStockValue = (isInStockFilter) => {
        this.setState({
            isInStockFilter
        })
    }

    handleCategoryType = (id) => {
        let categoryFilters = this.state.categoryFilters
        if (categoryFilters.includes(id)) {
            categoryFilters = categoryFilters.filter(item => item !== id)
        }   else {
            categoryFilters = [...categoryFilters, id]
        }

        this.setState({
            categoryFilters
        })
    }

    handleParseCategoryList = () => {
        const categoryList = this.state.categoryList
        const categoryFilters = []
        categoryList.map(category => {
            categoryFilters.push(category.id)
        })
        this.setState( {
            categoryFilters
        })
    }

    handleActiveItemValue = (id) => {
        const isItemActive = this.isItemActive
        this.setState({
            isItemActive: !isItemActive,
            itemPageId: id
        })
    }

    componentDidMount() {
        this.loadProductsList()
        this.loadCategoriesList()
        this.handleParseCategoryList()
    }

    loadProductsList() {
        this.setState({
            productsQueryStatus: queryState.loading
        })
        getProductsList().then((productList => {
            this.setState({
                products: productList,
                productsQueryStatus: queryState.success,
                productsQueryError: null
            })
        })).catch(error => {
            this.setState({
                productsQueryStatus: queryState.error,
                productsQueryError: error
            })
        })
    }

    loadCategoriesList() {
        this.setState({
            productsQueryStatus: queryState.loading
        })
        getCategoryList().then((categoryList => {
            this.setState({
                categoryList,
                categoryQueryStatus: queryState.success,
                categoryQueryError: null
            })
        })).catch(error => {
            this.setState({
                categoryQueryStatus: queryState.error,
                categoryQueryError: error
            })
        })
    }

    getFilteredProducts() {
        const {
            products,
            categoryList,
            titleInputValue,
            minPriceFilter,
            maxPriceFilter,
            minRatingFilter,
            maxRatingFilter,
            isNewFilter,
            isSaleFilter,
            isInStockFilter,
            categoryFilters
        } = this.state

        return (
        products.filter(product => {
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
            })
        )
    }

    render() {
        const {
            products,
            categoryList,
            productsQueryStatus,
            productsQueryError,
            titleInputValue,
            minPriceFilter,
            maxPriceFilter,
            minRatingFilter,
            maxRatingFilter,
            isNewFilter,
            isSaleFilter,
            isInStockFilter,

            isItemActive,
            itemPageId,
            categoryFilters
        } = this.state

        const isLoading = productsQueryStatus === queryState.loading || productsQueryStatus === queryState.initial
        const isSuccess = productsQueryStatus === queryState.success
        const isError = productsQueryStatus === queryState.error

        const filteredProducts = this.getFilteredProducts()

        return (
            !isItemActive
            ?
            <div className="">
            <div>
                <Filters
                    titleInputValue={titleInputValue}

                    categoryList={categoryList}
                    handleCategoryType={this.handleCategoryType}
                    categoryFilters={categoryFilters}
                    handleParseCategoryList={this.handleParseCategoryList}

                    minPriceFilter={minPriceFilter}
                    maxPriceFilter={maxPriceFilter}
                    minRatingFilter={minRatingFilter}
                    maxRatingFilter={maxRatingFilter}
                    isNewFilter={isNewFilter}
                    isSaleFilter={isSaleFilter}
                    isInStockFilter={isInStockFilter}
                    handleInputTitle={this.handleInputTitle}
                    handlePriceValue={this.handlePriceValue}
                    handleRatingValue={this.handleRatingValue}
                    handleIsNewValue={this.handleIsNewValue}
                    handleIsSaleValue={this.handleIsSaleValue}
                    handleIsInStockValue={this.handleIsInStockValue}
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

                        handleActiveItemValue={this.handleActiveItemValue}
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
            isItemActive
            ?
         <div>
             {
                 products
                     .filter(product => product.id === itemPageId)
                     .map(item => {
                         return <ItemPage key={item.id} item={item} products={products} categoryList={categoryList}/>
                     })
             }
         </div>
            :
        null
        );
    }
}

CatalogPage.propTypes = {

}

CatalogPage.defaultProps = {

}

export default CatalogPage;