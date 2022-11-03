import { useSelector, useDispatch } from "react-redux";
import { editItemCart, addItemCart, subItemCart, clearCart } from './ducks/Cart-duck'
import { useCallback, useMemo } from "react";

export function useCart() {
    const cartList = useSelector(state => state.cartList)
    const dispatch = useDispatch()

    const redactItemCart = useCallback(itemId => {
            dispatch(editItemCart(itemId))
        }, [])

    const insertItemCart = useCallback((itemId) => {
        dispatch(addItemCart(itemId))
    }, [dispatch])

    const deductItemCart = useCallback((itemId) => {
        dispatch(subItemCart(itemId))
    }, [dispatch])

    const cleanCart = useCallback(() => {
        dispatch(clearCart())
    }, [dispatch])

    return useMemo(() => ({
        cartList,
        redactItemCart,
        insertItemCart,
        deductItemCart,
        cleanCart
    }), [
        cartList,
        redactItemCart,
        insertItemCart,
        deductItemCart,
        cleanCart
    ])
}