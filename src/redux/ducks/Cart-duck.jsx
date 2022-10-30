export const namespace = 'cartList'

const cartList = new Map ()

const EDIT_ITEM_CART = `${namespace}/EDIT_ITEM_CART`
const ADD_ITEM_CART = `${namespace}/ADD_ITEM_CART`
const SUB_ITEM_CART = `${namespace}/SUB_ITEM_CART`
const CLEAR_CART = `${namespace}/CLEAR_CART`

export function editItemCart(itemId) {
    return {
        type: EDIT_ITEM_CART,
        payload: {
            itemId
        }
    }
}

export function addItemCart(itemId) {
    return {
        type: ADD_ITEM_CART,
        payload: {
            itemId
        }
    }
}

export function subItemCart(itemId) {
    return {
        type: SUB_ITEM_CART,
        payload: {
            itemId
        }
    }
}

export function clearCart() {
    return {
        type: CLEAR_CART,
    }
}

export function cartReducer(state = cartList, action) {
    const cartList = structuredClone(state)

    switch (action.type) {
        case EDIT_ITEM_CART: {
            if (!cartList.has(action.payload.itemId)) {
                console.log("!has")
                cartList.set(action.payload.itemId, 1)
                return cartList
            }

            if (cartList.has(action.payload.itemId)) {
                console.log("has")
                cartList.delete(action.payload.itemId)
                return cartList
            }
            return cartList
        }

        case ADD_ITEM_CART: {
            let quantity = cartList.get(action.payload.itemId)
            cartList.set(action.payload.itemId, ++quantity)
            return cartList
        }

        case SUB_ITEM_CART: {
            let quantity = cartList.get(action.payload.itemId)
            if (quantity === 1) return cartList
            else {
                cartList.set(action.payload.itemId, --quantity)
                return cartList
            }
        }

        case CLEAR_CART: {
            cartList.clear()
            return cartList
        }

        default: {
            return state
        }
    }
}
