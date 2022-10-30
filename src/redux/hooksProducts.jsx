import { useSelector, useDispatch } from "react-redux";
import { setProductsList } from './ducks/Product-duck'
import { useCallback, useEffect, useMemo } from "react";

export function useProducts() {
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const installProductsList = useCallback(productsList => {
            dispatch(setProductsList(productsList))
        }, [])

    return useMemo(() => ({
        products,
        installProductsList,

    }), [
        products,
        installProductsList,
    ])
}