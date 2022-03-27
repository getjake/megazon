import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { Grid, Card, CardActionArea, CardMedia, CardContent, CardActions } from "@mui/material";
import { Button, Typography } from "@mui/material";
// import data from "../utils/data";
import db from '../utils/db'
import Product from '../models/Product'

export default function Home(props) {
  const {products} = props

  return (
    <Layout>
      <h1>Products</h1>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={4} key={product.name}>
            <Card>
              <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia component="img" image={product.image} title={product.name} alt={product.name}></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>${product.price}</Typography>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find({}).lean()
  await db.disconnect()
  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }
}