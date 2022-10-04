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

            categoryFilters: {},

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
        const categoryFilters = this.state.categoryFilters
        categoryFilters[id] = !categoryFilters[id]

        this.setState({
            categoryFilters
        })
    }

    handleParseCategoryList = () => {
        const categoryList = this.state.categoryList
        // let categoryFilters = []
        let categoryFilters = {}

        for (let category of categoryList) {
            categoryFilters[category.id] = true
            // categoryFilters.push({[category.id]: true})
            // categoryFilters.push([category.id, true])
        }

        this.setState( {
            categoryFilters
        })
    }

    handleActiveItemValue = (id) => {
        this.setState({
            isItemActive: !this.state.isItemActive,
            itemPageId: id,
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
        this.setState({
            categoryNames
        })
        return categoryNames
    }

    componentDidMount() {
        this.loadProductsList()
        this.loadCategoriesList()
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

            state
        } = this.state

        let {
            categoryFilters,
        } = this.state

        // let isPassed = true

        // return products.filter(product => {
        //
        //     if (titleInputValue.trim() !== "") {
        //         let isMatch = product.title.toLowerCase().includes(titleInputValue.toLowerCase())
        //         isPassed = isPassed && isMatch
        //     }
        //
        //     const price = parseFloat(product.price)
        //     isPassed = isPassed && (
        //         price >= minPriceFilter && price <= maxPriceFilter
        //     )
        //
        //     const rating = +product.rating
        //     isPassed = isPassed && (
        //         rating >= minRatingFilter && rating <= maxRatingFilter
        //     )
        //
        //     if(isNewFilter) {
        //         isPassed = isPassed && product.isNew
        //     }
        //
        //     if(isSaleFilter) {
        //         isPassed = isPassed && product.isSale
        //     }
        //
        //     if(isInStockFilter) {
        //         isPassed = isPassed && product.isInStock
        //     }

        // categoryFilters = [
        //     {
        //         "Mindy McCullough": true,
        //     },
        //     {
        //         "Devin Schimmel": true,
        //     },
        //     {
        //         "Sheri Herzog": true,
        //     },
        //     {
        //         "Deanna Hyatt": true,
        //     },
        //     {
        //         "Nichole Weissnat": true,
        //     },
        //     {
        //         "Clay Kuvalis": true
        //     },
        //     {
        //         "Peggy Kozey DVM": true
        //     },
        //     {
        //         "Sherri Stark DDS": true
        //     },
        //     {
        //         "Thomas White": true
        //     },
        //     {
        //         "Miss Seth Braun": true
        //     },
        //     {
        //         "Jana Moore": true
        //     },
        //     {
        //         "Anita Fadel": true
        //     },
        //     {
        //         "Mrs. Nichole O'Hara": true
        //     },
        //     {
        //         "April Mosciski": true
        //     },
        //     {
        //         "Margie Bahringer": true
        //     },
        //     {
        //         "Edmund Shanahan": true
        //     }
        // ]
        //
        // })

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

            if (isNewFilter) {
                isPassed = isPassed && product.isNew
            }

            if (isSaleFilter) {
                isPassed = isPassed && product.isSale
            }

            if (isInStockFilter) {
                isPassed = isPassed && product.isInStock
            }

            // categoryFilters.filter(category => {
            //     // console.log(category)
            //     if (category[1] === true) {
            //         console.log("test")
            //         isPassed = isPassed && categoryFilters[1]
            //     }
            // })

            for (let category in categoryFilters) {
                console.log(categoryFilters[category])
                // console.log(categoryFilters[category] === true)
                if (categoryFilters[category] === true) {
                    // console.log("test")
                    // console.log(isPassed)
                    isPassed = isPassed && categoryFilters[category]
                }
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
        );
    }
}

CatalogPage.propTypes = {

}

CatalogPage.defaultProps = {

}

export default CatalogPage;