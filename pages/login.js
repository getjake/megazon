import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { List, ListItem, Typography, TextField, Button, Link } from "@mui/material";
import NextLink from "next/link";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import { Store } from "../utils/Store";

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const classes = useStyles();

  const submitHandler = async ({ email, password }) => {
    // e.preventDefault();
    closeSnackbar();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", data);
      router.push(redirect || "/");
    } catch (error) {
      // alert(error.response.data ? error.response.data.message : error.message);
      enqueueSnackbar(error.response.data ? error.response.data.message : error.message, {
        variant: "error",
      });
    }
  };

  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not valid"
                        : "Email is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
          <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password length is less than 6"
                        : "Password is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Dont have an account? {"\u00A0"}
            <NextLink href={`/register?redirect=${redirect || "/"}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Login;
