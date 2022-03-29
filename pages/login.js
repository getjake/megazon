import React, {useState} from "react";
import axios from 'axios'
import { List, ListItem, Typography, TextField, Button, Link } from "@mui/material";
import NextLink from "next/link";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles();

  const submitHandler = async(e) => {
    e.preventDefault()
    try {
      const{data} = await axios.post('/api/users/login', {
        email, password
      })
      alert('success login')
    } catch(error) {
      alert(error.response.data ? error.response.data.message: error.message)
    }
  }


  return (
    <Layout title="Login">
      <form onSubmit={submitHandler} className={classes.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Dont have an account? {"\u00A0"}
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Login;
