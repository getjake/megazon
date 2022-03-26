import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import { Grid, Card, CardActionArea, CardMedia,CardContent,Typography,CardActions, Button } from '@material-ui/core'
import data from '../utils/data'

export default function Home() {
  return (
    <Layout>
      <h1>Products</h1>

      <Grid container spacing={3}>
        {data.products.map((product) => (
          <Grid item md={4} key={product.name}>
            <Card>
              <CardActionArea>
                <CardMedia 
                  component='img'
                  image={product.image}
                  title={product.name}
                >

                </CardMedia>
                <CardContent>
                <Typography>{product.name}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Typography>${product.price}</Typography>
                <Button size='small' color='primary'>Add to Cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}
