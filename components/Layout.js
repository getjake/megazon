import React, { useContext, useEffect } from "react";
import Head from "next/head";

import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  CssBaseline,
  ThemeProvider,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import { useRouter } from "next/router";
import { getError } from "../utils/error";
import useStyles from "../utils/styles";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import axios from "axios";

const Layout = ({ title, description, children }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: "error" });
    }
  };

  useEffect(() => {
    fetchCategories()
  }, [])
  
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const classes = useStyles();

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    router.push("/");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <title>{title ? `${title} - Megazon` : `Megazon`}</title>
          {description && <meta name="description" content={description}></meta>}
        </Head>

        <AppBar position="static" className={classes.navBar}>
          <Toolbar className={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <IconButton edge="start" aria-label="open drawer" onClick={sidebarOpenHandler}>
                <MenuIcon className={classes.navbarButton} />
              </IconButton>
              <NextLink href="/" passHref>
                <Link>
                  <Typography className={classes.brand}>megazon</Typography>
                </Link>
              </NextLink>
            </Box>

            <Drawer anchor="left" open={sidebarVisible} onClose={sidebarCloseHandler}>
              <List>
                <ListItem>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography>Shopping by category</Typography>
                    <IconButton aria-label="close" onClick={sidebarCloseHandler}>
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </ListItem>

                <Divider light />
                {categories.map((category) => (
                  <NextLink key={category} href={`/search?category=${category}`} passHref>
                    <ListItem button component="a" onClick={sidebarCloseHandler}>
                      <ListItemText primary={category} />
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>

            <div className={classes.grow}></div>
            <div>
              <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  <Typography component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge color="secondary" badgeContent={cart.cartItems.length}>
                        Cart
                      </Badge>
                    ) : (
                      "Cart"
                    )}
                  </Typography>
                </Link>
              </NextLink>

              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem onClick={(e) => loginMenuCloseHandler(e, "/profile")}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={(e) => loginMenuCloseHandler(e, "/order-history")}>
                      Order History
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem onClick={(e) => loginMenuCloseHandler(e, "/admin/dashboard")}>
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>
                    <Typography component="span">Login</Typography>
                  </Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>

        <Container className={classes.main}>{children}</Container>
        <footer>
          <Typography className={classes.footer}>All right reserverd. Magazon.</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
