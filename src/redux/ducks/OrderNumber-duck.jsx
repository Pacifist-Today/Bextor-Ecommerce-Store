export const namespace = 'orderId'

let orderId = 0

const SET_ORDER_ID = `${namespace}/SET_ORDER_ID`

export function setOrderId() {
    return {
        type: SET_ORDER_ID,
    }
}

export function orderIdReducer(state = orderId, action) {
    if (action.type === "setOrderId") {
        return orderId++
    }
    return orderId
}