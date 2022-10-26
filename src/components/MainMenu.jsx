import {memo} from "react";
import CatalogPage from "./catalogue/CatalogPage";
import CartPage from "./cart/CartPage";
import {Button, Typography} from "@mui/material";
import {NavLink, Route, Routes} from "react-router-dom";
import ItemPage from "./catalogue/ItemPage";
import {Provider} from "react-redux";
import {cart} from "./Stores/ReduxStore";
import MainMenu from "./MainMenu";
import RouterNavigation from "./Routes/RouterNavigation";
import OrderMainForm from "./ordering/OrderMainForm";
import DeliveryInfoPage from "./delivery/DeliveryInfoPage";
import AboutUsInfoPage from "./about/AboutUsInfoPage";

const mainMenu = memo((props) => {
    return (
        <div className="wrapper">
            <header>
                <nav>
                    <Button LinkComponent={NavLink} to="/" ><img src="" alt="Nice logo" /></Button>
                    <Button LinkComponent={NavLink} to="/catalog" >Catalog</Button>
                    <Button LinkComponent={NavLink} to="/about" >About us</Button>
                    <Button LinkComponent={NavLink} to="/delivery" >Delivery</Button>
                    <Button LinkComponent={NavLink} to="/cart" >Cart</Button>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route
                        path="/catalog"
                        element={
                            <Provider store={cart}>
                                <CatalogPage />
                            </Provider>
                        }
                    />
                    <Route
                        path="/product/:id"
                        element={
                            <Provider store={cart}>
                                <ItemPage />
                            </Provider>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <Provider store={cart}>
                                <CartPage/>
                            </Provider>
                        }
                    />
                    <Route
                        path="/delivery"
                        element={
                            <Provider store={cart}>
                                <DeliveryInfoPage />
                            </Provider>
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <Provider store={cart}>
                                <AboutUsInfoPage />
                            </Provider>
                        }
                    />
                </Routes>
            </main>
            <footer>
                <Typography variant="h6" component="h6">
                    All rights reserved 2022 @Ingenious.inc
                </Typography>
            </footer>
        </div>
    )
})

export default mainMenu