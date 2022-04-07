import React, { useState, useEffect, useReducer } from "react";
import NextLink from "next/link";
import { List, ListItem, Card, ListItemText } from "@mui/material";
import useStyles from "../utils/styles";

const defaultState = {
  dashboardToggle: false,
  ordersToggle: false,
  productsToggle: false,
  usersToggle: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_DASHBOARD":
      return { ...defaultState, dashboardToggle: true };
    case "SELECT_ORDERS":
      return { ...defaultState, ordersToggle: true };
    case "SELECT_PRODUCTS":
      return { ...defaultState, productsToggle: true };
    case "SELECT_USERS":
      return { ...defaultState, usersToggle: true };
    default:
      defaultState;
  }
};

const AdminLeftPanel = ({ selectedTarget }) => {
  const [{ dashboardToggle, ordersToggle, productsToggle, usersToggle }, dispatch] = useReducer(
    reducer,
    defaultState
  );
  const classes = useStyles();

  useEffect(() => {
    if (selectedTarget !== undefined) {
      dispatch({ type: selectedTarget });
    }
  }, [selectedTarget]);

  return (
    <Card className={classes.section}>
      <List>
        <NextLink href="/admin/dashboard" passHref>
          <ListItem selected={dashboardToggle} button components="a">
            <ListItemText primary="Admin Dashboard" />
          </ListItem>
        </NextLink>
        <NextLink href="/admin/orders" passHref>
          <ListItem selected={ordersToggle} button components="a">
            <ListItemText primary="Orders" />
          </ListItem>
        </NextLink>
        <NextLink href="/admin/products" passHref>
          <ListItem selected={productsToggle} button component="a">
            <ListItemText primary="Products"></ListItemText>
          </ListItem>
        </NextLink>
        <NextLink href="/admin/users" passHref>
          <ListItem selected={usersToggle} button component="a">
            <ListItemText primary="Users"></ListItemText>
          </ListItem>
        </NextLink>
      </List>
    </Card>
  );
};

export default AdminLeftPanel;
