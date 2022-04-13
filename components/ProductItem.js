import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import NextLink from "next/link";
import Rating from "@mui/material/Rating";
import useStyles from "../utils/styles";

const ProductItem = ({ product, addToCartHandler }) => {
  const classes = useStyles();
  return (
    <Card>
    <NextLink href={`/product/${product.slug}`} passHref>
      <CardActionArea>
        <CardMedia
          component="img"
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography>{product.name}</Typography>
          <Rating value={product.rating} readOnly/>
        </CardContent>
      </CardActionArea>
    </NextLink>
    <CardActions className={classes.productItemButtom}>
      <Typography>${product.price}</Typography>
      <Button
        size="small"
        color="primary"
        onClick={() => addToCartHandler(product)}
      >
        Add to cart
      </Button>
    </CardActions>
  </Card>
  );
};

export default ProductItem;
