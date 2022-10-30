import { useSelector, useDispatch } from "react-redux";
import { setCategoriesList } from './ducks/Categories-duck'
import { useCallback, useEffect, useMemo } from "react";

export function useCategories() {
    const categories = useSelector(state => state.products)
    const dispatch = useDispatch()

    const installCategoriesList = useCallback(productsList => {
        dispatch(setCategoriesList(productsList))
    }, [])

    return useMemo(() => ({
        categories,
        installCategoriesList,

    }), [
        categories,
        installCategoriesList,
    ])
}