import {BrowserRouter, Route, Routes} from "react-router-dom";
import CatalogPage from "../catalogue/CatalogPage";
import CartPage from "../cart/CartPage";
import ItemPage from "../catalogue/ItemPage";
import {cart} from "../../redux/store";
import {Provider} from "react-redux";
import DeliveryInfoPage from "../delivery/DeliveryInfoPage";

export function RouterNavigation () {
    return (
        <Provider store={cart}>
            <BrowserRouter>
                <Routes>
                    <Route path="/catalog" element={<CatalogPage />}/>
                    <Route path="/product/:id" element={<ItemPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    {/*<Route path="*" element={<Page404 />} />*/}
                    <Route path="/about" element={<CatalogPage />} />
                    <Route path="/delivery" element={<DeliveryInfoPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default RouterNavigation