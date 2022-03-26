import React from 'react'
import Head from 'next/head'
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core'
import useStyles from '../utils/styles'

const Layout = ({children}) => {
    const classes = useStyles()
  return (
    <div>
        <Head>
            <title>Megazon</title>
        </Head>
        <AppBar position='static' className={classes.navBar}>
            <Toolbar>
                <Typography>Megazon</Typography>
            </Toolbar>
        </AppBar>
        <Container className={classes.main}>
            {children}
        </Container>
        <footer>
            <Typography className={classes.footer}>
                All right reserverd. Magazon.
            </Typography>
        </footer>
    </div>
  )
}

export default Layout