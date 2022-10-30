import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {NavLink, Route} from "react-router-dom";
import {Routes} from "react-router";
import ItemPage from "./components/catalogue/ItemPage";
import CartPage from "./components/cart/CartPage";
import DeliveryInfoPage from "./components/delivery/DeliveryInfoPage";
import AboutUsInfoPage from "./components/about/AboutUsInfoPage";
import CatalogPage from "./components/catalogue/CatalogPage";
// import MainMenu from "./components/MainMenu";
import MainMenu from "./components/MainMenu";
import Error404 from "./components/error-page/Error404";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import {useCart} from "./redux/hooksCart";
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const pages = ['Catalog', 'About us', 'Delivery', "Cart"];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    const {cartList} = useCart()

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
    <div style={{minHeight: "100%", display: "flex", flexDirection: "column"}}>
      <header>
          <ThemeProvider theme={darkTheme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            LinkComponent={NavLink} to="/"
                        >
                            Bextor
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Bextor
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                           <Button
                               LinkComponent={NavLink}
                               to="/catalog"
                               sx={{ my: 2, color: 'white', display: 'block' }}
                           >Catalog</Button>
                           <Button
                               LinkComponent={NavLink}
                               to="/about"
                               sx={{ my: 2, color: 'white', display: 'block' }}
                           >About us</Button>
                           <Button
                               LinkComponent={NavLink}
                               to="/delivery"
                               sx={{ my: 2, color: 'white', display: 'block' }}
                           >Delivery</Button>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Button
                                LinkComponent={NavLink}
                                to="/cart"
                                sx = {{marginRight: "15px"}}
                            >
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={cartList.size} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </IconButton>
                            </Button>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
     </header>
    <main style={{flex: "1 1 auto"}}>
        <Routes>
             <Route path="/" element={<MainMenu />} />
             <Route path="/catalog" element={<CatalogPage />}/>
             <Route path="/product/:id" element={<ItemPage />} />
             <Route path="/cart" element={<CartPage />} />
             <Route path="*" element={<Error404 />} />
             <Route path="/about" element={<AboutUsInfoPage />} />
             <Route path="/delivery" element={<DeliveryInfoPage />} />
        </Routes>
    </main>
      <footer>
          <ThemeProvider theme={darkTheme}>
              <AppBar position="static" color="primary" sx={{padding: "10px 5%"}}>
                  <Typography variant="h6" component="p">© Copyrights. All rights reserved 2022 by Dimon</Typography>
              </AppBar>
          </ThemeProvider>

      </footer>
    </div>
);
}
export default ResponsiveAppBar;