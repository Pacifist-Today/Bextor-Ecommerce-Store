import {createStore, combineReducers} from "redux";

const cartProductsReducer = (cartList = new Map(), action) => {

    if (action.type === "cartItem") {

        if (!cartList.has(action.payload.id)) {
            cartList.set(action.payload.id, action.payload.quantity)
            return cartList
        }

        if (cartList.has(action.payload.id)) {
            cartList.delete(action.payload.id)
            return cartList
        }
    }

    if (action.type === "addCartItem") {
        let quantity = cartList.get(action.payload.id)
        cartList.set(action.payload.id, ++quantity)
        return cartList
    }

    if (action.type === "subCartItem") {
        let quantity = cartList.get(action.payload.id)
        if (quantity === 1) return cartList
        else {
            cartList.set(action.payload.id, --quantity)
            return cartList
        }
    }

    if (action.type === "clearCart") {
        cartList.clear()
    }

    return cartList
}

const productsReducer = (products = [], action) => {
    if (action.type === "products") {
        products = action.payload.products
        return products
    }
    return products
}

const categoriesReducer = (categories = [], action) => {
    if (action.type === "categories"){
        categories = action.payload.categories
        return categories
    }
    return categories
}

let orderNumberCounter = 1

const setOrdersIdReducer = (ordersId = [], action) => {
    if (action.type === "setOrderId") {
        ordersId.push(orderNumberCounter)
        orderNumberCounter++
        return ordersId
    }
    return ordersId
}

const rootReducer = combineReducers({
    cartProducts: cartProductsReducer,
    products: productsReducer,
    categories: categoriesReducer,
    ordersId: setOrdersIdReducer,
})

export const cart = createStore(rootReducer)