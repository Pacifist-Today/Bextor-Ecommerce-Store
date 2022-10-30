import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from "prop-types";
import {Box, Switch, FormControlLabel, FormGroup, TextField, Slider, Button} from "@mui/material";

const Filters = memo((props => {
    const {
        categoryList,
        handleCategoryType,
        categoryFilters,
        setDefaultSelectedCategories,
        titleInputValue,
        minPriceFilter,
        maxPriceFilter,
        minRatingFilter,
        maxRatingFilter,
        lowestPrice,
        highestPrice,
        lowestRating,
        highestRating,
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

    const onChangeTitle = useCallback(({target}) => {
        const value = target.value
        handleInputTitle(value)
    }, [titleInputValue])

    const onChangeIsNew = useCallback(()=> {
        handleIsNewValue(!isNewFilter)
    }, [isNewFilter])

    const onChangeIsSale = useCallback(() => {
        handleIsSaleValue(!isSaleFilter)
    }, [isSaleFilter])

    const onChangeIsinStock = useCallback(()=> {
            handleIsInStockValue(!isInStockFilter)
    }, [isInStockFilter])

    const onChangeCategoryType = useCallback(({target}) => {
        handleCategoryType(target.value)
    }, [categoryFilters])

    const onClickSelectAllCategories = useCallback(() => {
        setDefaultSelectedCategories()
    }, [categoryFilters])

    const [priceRange, setPriceRange] = useState([+minPriceFilter, +maxPriceFilter]);

    const onChangePriceValues = useCallback((event, newPrice) => {
        handlePriceValue(newPrice[0], newPrice[1])
        setPriceRange(newPrice);
    }, []);

    const [ratingRange, setRatingRange] = useState([+minRatingFilter, +maxRatingFilter])

    const onChangeRatingValues = useCallback( (event, newRange) => {
        handleRatingValue(newRange[0], newRange[1])
        setRatingRange(newRange)
    }, [])

    return (
        <div>
            <div>
                <TextField id="standard-basic" label="I'm looking for..." variant="standard" onChange={onChangeTitle} />
            </div>
            <Box sx={{ width: "100%"}}>
                <p>Filtering by price:</p>
                <Slider
                    value={priceRange}
                    min={lowestPrice}
                    max={highestPrice}
                    onChange={onChangePriceValues}
                    valueLabelDisplay="auto"
                />
            </Box>
            <Box sx={{ width: "100%" }}>
                <p>Filtering by rating:</p>
                <Slider
                    value={ratingRange}
                    min={lowestRating}
                    max={highestRating}
                    onChange={onChangeRatingValues}
                    valueLabelDisplay="auto"
                />
            </Box>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch checked={isNewFilter} onChange={onChangeIsNew} />
                    }
                    label="Novelty"
                />
                <FormControlLabel
                    control={
                        <Switch checked={isSaleFilter} onChange={onChangeIsSale} />
                    }
                    label="On sale"
                />
                <FormControlLabel
                    control={
                        <Switch checked={isInStockFilter} onChange={onChangeIsinStock} />
                    }
                    label="In stock"
                />
            </FormGroup>
            <p>Filtering by categories</p>
            <Button onClick={onClickSelectAllCategories}>Select all</Button>
            {
                categoryList.map(value => (
                    <Box key={value.id}>
                        <FormControlLabel
                            control={
                                <Switch value={value.id} checked={categoryFilters.includes(value.id)} onChange={onChangeCategoryType} />
                            }
                            label={value.name}
                        />
                    </Box>
                    )
                )
            }
        </div>
    );
}))

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

    categoryList: PropTypes.arrayOf(PropTypes.shape({
        avatar: PropTypes.string,
        createdAt: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string
    })),

    handleCategoryType: PropTypes.func,
    categoryFilters: PropTypes.arrayOf(PropTypes.string),
    setDefaultSelectedCategories: PropTypes.func
}

export default Filters;