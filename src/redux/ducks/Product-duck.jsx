export const namespace = 'products'

let products = []

const SET_PRODUCTS = `${namespace}/SET_PRODUCTS`

export function setProductsList(productsList) {
    return {
        type: SET_PRODUCTS,
        payload: {
            productsList
        }
    }
}

export function productsReducer(state = products, action) {
    if (action.type === SET_PRODUCTS) {
        products = action.payload.productsList
        return products
    }
    return products
}