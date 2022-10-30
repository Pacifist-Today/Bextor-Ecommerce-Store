import CatalogPage from "./components/catalogue/CatalogPage";
import {Button, css, CssBaseline} from "@mui/material";
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import {Routes} from "react-router";
import {Provider, useSelector} from "react-redux";
import {store} from "./redux/store";
import ItemPage from "./components/catalogue/ItemPage";
import CartPage from "./components/cart/CartPage";
import DeliveryInfoPage from "./components/delivery/DeliveryInfoPage";
import AboutUsInfoPage from "./components/about/AboutUsInfoPage";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const App = () => {
    // const cartList = useSelector(state => {
    //     console.log(state)
    // })
  return (
          <Provider store={store}>
              <BrowserRouter>
                  <CssBaseline />
                  <header>
                      <nav>
                          <Button LinkComponent={NavLink} to="/" ><img src="" alt="Nice logo" /></Button>
                          <Button LinkComponent={NavLink} to="/catalog" >Catalog</Button>
                          <Button LinkComponent={NavLink} to="/about" >About us</Button>
                          <Button LinkComponent={NavLink} to="/delivery" >Delivery</Button>
                          <Button LinkComponent={NavLink} to="/cart" >
                              <IconButton aria-label="cart">
                                  <StyledBadge badgeContent={1} color="secondary">
                                      <ShoppingCartIcon />
                                  </StyledBadge>
                              </IconButton>
                              {/*Cart*/}
                          </Button>
                      </nav>
                  </header>
                  <Routes>
                      <Route path="/catalog" element={<CatalogPage />}/>
                      <Route path="/product/:id" element={<ItemPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      {/*<Route path="*" element={<Page404 />} />*/}
                      <Route path="/about" element={<AboutUsInfoPage />} />
                      <Route path="/delivery" element={<DeliveryInfoPage />} />
                  </Routes>
              </BrowserRouter>
          </Provider>
  );
}

export default App;
