import { createStore, combineReducers, applyMiddleware } from "redux";
import * as cartDuck from "./ducks/Cart-duck"
import { loggerMiddleware } from "./middleware";
import * as productDuck from "./ducks/Product-duck"
import * as categoryDuck from "./ducks/Categories-duck"
import * as orderIDDuck from  "./ducks/OrderNumber-duck"

const rootReducer = combineReducers({
    [cartDuck.namespace]: cartDuck.cartReducer,
    [productDuck.namespace]: productDuck.productsReducer,
    [categoryDuck.namespace]: categoryDuck.categoriesReducer,
    [orderIDDuck.namespace]: orderIDDuck.orderIdReducer
})

export const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(loggerMiddleware)
)