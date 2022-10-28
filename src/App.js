import { Button, Typography } from "@mui/material";
import { NavLink, Route, Routes } from "react-router-dom";
import CatalogPage from "./components/catalogue/CatalogPage";
import ItemPage from "./components/catalogue/ItemPage";
import CartPage from "./components/cart/CartPage";
import DeliveryInfoPage from "./components/delivery/DeliveryInfoPage";
import AboutUsInfoPage from "./components/about/AboutUsInfoPage";

export const App = props => {
  return (
    <div className="wrapper">
      <header>
        <nav>
          <Button LinkComponent={NavLink} to="/"><img src="" alt="Nice logo"/></Button>
          <Button LinkComponent={NavLink} to="/catalog">Catalog</Button>
          <Button LinkComponent={NavLink} to="/about">About us</Button>
          <Button LinkComponent={NavLink} to="/delivery">Delivery</Button>
          <Button LinkComponent={NavLink} to="/cart">Cart</Button>
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/catalog"
            element={
              <CatalogPage/>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ItemPage/>
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage/>
            }
          />
          <Route
            path="/delivery"
            element={
              <DeliveryInfoPage/>
            }
          />
          <Route
            path="/about"
            element={
              <AboutUsInfoPage/>
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
}

export default App;
