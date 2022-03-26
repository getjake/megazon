import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import { AppBar, Toolbar, Typography, Container, Link } from "@material-ui/core";
import useStyles from "../utils/styles";

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Megazon</title>
      </Head>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography className={classes.brand}>Megazon</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}></div>
          <div>
              <NextLink href="/cart" passHref><Link>Cart</Link></NextLink>
              <NextLink href="/login" passHref><Link>Login</Link></NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer>
        <Typography className={classes.footer}>All right reserverd. Magazon.</Typography>
      </footer>
    </div>
  );
};

export default Layout;
