import React, { useState, useEffect, useReducer } from "react";
import NextLink from "next/link";
import { List, ListItem, Card, ListItemText } from "@mui/material";
import useStyles from "../utils/styles";

const defaultState = {
  dashboardToggle: false,
  ordersToggle: false,
  productsToggle: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_DASHBOARD":
      return { ...defaultState, dashboardToggle: true };
    case "SELECT_ORDERS":
      return { ...defaultState, ordersToggle: true };
    case "SELECT_PRODUCTS":
      return { ...defaultState, productsToggle: true };
    default:
      defaultState;
  }
};

const AdminLeftPanel = ({ selectedTarget }) => {
  const [{ dashboardToggle, ordersToggle, productsToggle }, dispatch] = useReducer(
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
          {dashboardToggle ? (
            <ListItem selected button components="a">
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
          ) : (
            <ListItem button components="a">
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
          )}
        </NextLink>
        <NextLink href="/admin/orders" passHref>
          {ordersToggle ? (
            <ListItem selected button components="a">
              <ListItemText primary="Orders" />
            </ListItem>
          ) : (
            <ListItem button components="a">
              <ListItemText primary="Orders" />
            </ListItem>
          )}
        </NextLink>
        <NextLink href="/admin/products" passHref>
          {productsToggle ? (
            <ListItem selected button component="a">
              <ListItemText primary="Products"></ListItemText>
            </ListItem>
          ) : (
            <ListItem button component="a">
              <ListItemText primary="Products"></ListItemText>
            </ListItem>
          )}
        </NextLink>
      </List>
    </Card>
  );
};

export default AdminLeftPanel;
