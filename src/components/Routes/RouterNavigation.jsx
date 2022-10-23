import {HashRouter, BrowserRouter, Route, Routes, Router} from "react-router-dom";
import CatalogPage from "../catalogue/CatalogPage";
import CartPage from "../cart/CartPage";
import ItemPage from "../catalogue/ItemPage";
import MainMenu from "../MainMenu";
import {cart} from "../Stores/ReduxStore";
import {Provider} from "react-redux";

export function RouterNavigation () {
    return (
        <BrowserRouter>
            {/*<Router>*/}
                {/*<CartPage/>*/}
                {/*<MainMenu/>*/}
            <Routes>
                <Route path="/catalog" element={
                    <Provider store={cart}>
                        <CatalogPage/>
                    </Provider>
                }
                />
                <Route path="/product/:id" element={<ItemPage />} />
                <Route path="/cart" element={<CartPage />} />
                {/*<Route path="*" element={<Page404 />} />*/}
                <Route path="/about" element={<CatalogPage />} />
                <Route path="/delivery" element={<CatalogPage />} />
            </Routes>
            {/*</Router>*/}
        </BrowserRouter>
    )
}

export default RouterNavigation