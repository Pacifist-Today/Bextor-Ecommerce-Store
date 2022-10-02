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
            categoriesQueryStatus: queryState.initial,
            categoriesQueryError: null,

            categoryFilters: {

            },

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

    handleCategoryType = (name, value) => {

    }

    handleParseCategoryList = () => {
        const categoryList = this.state.categoryList
        console.log(categoryList)
        let categoryFilters = {}

        for (let category of categoryList) {
            let categoryName = category.name
            categoryFilters[categoryName] = true
        }

        categoryFilters = [categoryFilters]

        this.setState( {
            categoryFilters
        })
    }

    handleActiveItemValue = (id) => {
        this.setState({
            isItemActive: !this.state.isItemActive,
            itemPageId: id
        })

        const { products, categoryList, itemPageId } = this.state
        let categoryNames = []

        products
            .filter(product => product.id === itemPageId)
            .map(product =>
                product.categories.map((value) => {
                    return categoryList
                        .filter((item) => item.id.includes(value))
                        .map(good => {
                            console.log(good)
                            return categoryNames.push(good.names)
                        })
                }))
        console.log(categoryNames)

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
        } = this.state

        return products.filter(product => {
            let isPassed = true

            if (titleInputValue.trim() !== "") {
                let isMatch = product.title.toLowerCase().includes(titleInputValue.toLowerCase())
                isPassed = isPassed && isMatch
            }

            const price = parseFloat(product.price)
            isPassed = isPassed && (
                price >= minPriceFilter && price <= maxPriceFilter
            )

            const rating = +product.rating
            isPassed = isPassed && (
                rating >= minRatingFilter && rating <= maxRatingFilter
            )

            if(isNewFilter) {
                isPassed = isPassed && product.isNew
            }

            if(isSaleFilter) {
                isPassed = isPassed && product.isSale
            }

            if(isInStockFilter) {
                isPassed = isPassed && product.isInStock
            }

            return isPassed
        })

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

        console.log(categoryFilters)
        // console.log(categoryList)

        let categoriesNames = []

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
                 // products
                 //     .filter(product => product.id === itemPageId)
                 //     .map(product =>
                 //         product.categories.map((value) => {
                 //             return categoryList
                 //                 .filter((item) => item.id.includes(value))
                 //                 .map(good => {
                 //                     console.log(good)
                 //                     return categoriesNames.push(good.names)
                 //                 })
                 //         }))
                     //     <ItemPage
                     //     key={product.id}
                     //     titleInputValue={titleInputValue}
                     //     photo={product.photo}
                     //     isNewFilter={isNewFilter}
                     //     isSaleFilter={isSaleFilter}
                     //     price={product.price}
                     //     rating={product.rating}
                     //     categories={product.categories}
                     //     description={product.description}
                     // />)
             }
         </div>
            :
        null

            // <div className="">
            //     <div>
            //         <Filters
            //             titleInputValue={titleInputValue}
            //             minPriceFilter={minPriceFilter}
            //             maxPriceFilter={maxPriceFilter}
            //             minRatingFilter={minRatingFilter}
            //             maxRatingFilter={maxRatingFilter}
            //             isNewFilter={isNewFilter}
            //             isSaleFilter={isSaleFilter}
            //             isInStockFilter={isInStockFilter}
            //             handleInputTitle={this.handleInputTitle}
            //             handlePriceValue={this.handlePriceValue}
            //             handleRatingValue={this.handleRatingValue}
            //             handleIsNewValue={this.handleIsNewValue}
            //             handleIsSaleValue={this.handleIsSaleValue}
            //             handleIsInStockValue={this.handleIsInStockValue}
            //         />
            //     </div>
            //     <div>
            //         {isLoading && (
            //             <div>Loading...</div>
            //         )}
            //         {!isLoading && isSuccess && (
            //             <ProductList products={filteredProducts} allProductsAmount={products.length} />
            //         )}
            //         {!isLoading && isError && (
            //             <div>
            //                 {productsQueryError?.message || "Something went wrong"}
            //             </div>
            //         )}
            //     </div>
            //
            // </div>
        );
    }
}

CatalogPage.propTypes = {

}

CatalogPage.defaultProps = {

}

export default CatalogPage;