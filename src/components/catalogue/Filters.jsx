import React, {useEffect} from 'react';
import PropTypes from "prop-types";

const Filters = (props) => {
    const {
        categoryList,
        handleCategoryType,
        categoryFilters,
        handleParseCategoryList,

        titleInputValue,
        minPriceFilter,
        maxPriceFilter,
        minRatingFilter,
        maxRatingFilter,
        isNewFilter,
        isSaleFilter,
        isInStockFilter,
        handleInputTitle,
        handlePriceValue,
        handleRatingValue,
        handleIsNewValue,
        handleIsSaleValue,
        handleIsInStockValue
    } = props

    const onChangeTitle = ({target}) => {
        const value = target.value
        handleInputTitle(value)
    }

    const onChangeMinPrice = ({target}) => {
        let value = parseInt(target.value)
        value = Number.isNaN(value) ? 0 : value

        handlePriceValue(value, maxPriceFilter)
    }

    const onChangeMaxPrice = ({target}) => {
        let value = parseInt(target.value)
        value = Number.isNaN(value) ? 0 : value

        handlePriceValue(minPriceFilter, value)
    }

    const onChangeMinRating = ({target}) => {
        let value = parseInt(target.value)
        value = Number.isNaN(value) ? 0 : value

        handleRatingValue(value, maxRatingFilter)
    }

    const onChangeMaxRating = ({target}) => {
        let value = parseInt(target.value)
        value = Number.isNaN(value) ? 0 : value

        handleRatingValue(minRatingFilter, value)
    }

    const onChangeIsNew = () => {
        handleIsNewValue(!isNewFilter)
    }

    const onChangeIsSale = () => {
        handleIsSaleValue(!isSaleFilter)
    }

    const onChangeIsinStock = () => {
        handleIsInStockValue(!isInStockFilter)
    }

    const onChangeCategoryType = ({target}) => {
        handleCategoryType(target.value)
    }

    const onClickSelectAllCategories = () => {
        handleParseCategoryList()
    }

    useEffect(()=>{
        handleParseCategoryList()
    },[])

    return (
        <div>
            <div>
                <input type="text" value={titleInputValue} onChange={onChangeTitle} />
            </div>
            <div>
                <p>Filtering by price:</p>
                <span>From: <input type="number" value={minPriceFilter} min="0" max={maxPriceFilter - 1} onChange={onChangeMinPrice} /></span>
                <span>To: <input type="number" value={maxPriceFilter} min={minPriceFilter + 1} onChange={onChangeMaxPrice} /></span>
            </div>
            <div>
                <p>Filtering by rating:</p>
                <span>From: <input type="number" value={minRatingFilter} min="0" max={maxRatingFilter - 1} onChange={onChangeMinRating} /></span>
                <span>To: <input type="number" value={maxRatingFilter} min={minPriceFilter + 1} onChange={onChangeMaxRating} /></span>
            </div>
            <div>
                <label>
                    <input type="checkbox" checked={isNewFilter} onChange={onChangeIsNew} />
                    <span>Novelty</span>
                </label>
            </div>
            <div>
                <label>
                    <input type="checkbox" checked={isSaleFilter} onChange={onChangeIsSale} />
                    <span>On sale</span>
                </label>
            </div>
            <div>
                <label>
                    <input type="checkbox" checked={isInStockFilter} onChange={onChangeIsinStock} />
                    <span>In stock</span>
                </label>
            </div>
            <ul>
                <p>Filtering by categories</p>
                <button onClick={onClickSelectAllCategories}>Select all</button>
                {
                    categoryList.map(value => (
                        <li key={value.id}>
                            <label>
                                <input type="checkbox" value={value.id} checked={categoryFilters.includes(value.id)} onChange={onChangeCategoryType} />
                                <span>{value.name}</span>
                            </label>
                        </li>
                    )
                )
                }
            </ul>
        </div>
    );
}

Filters.propTypes = {
    titleInputValue: PropTypes.string,
    minPriceFilter: PropTypes.number,
    maxPriceFilter: PropTypes.number,
    minRatingFilter: PropTypes.number,
    maxRatingFilter: PropTypes.number,
    isNewFilter: PropTypes.bool,
    isSaleFilter: PropTypes.bool,
    isInStockFilter: PropTypes.bool,
    handleInputTitle: PropTypes.func,
    handlePriceValue: PropTypes.func,
    handleRatingValue: PropTypes.func,
    handleIsNewValue: PropTypes.func,
    handleIsSaleValue: PropTypes.func,
}

export default Filters;