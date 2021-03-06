import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "./Navbar";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a href="https://danusshpportfolio.netlify.app/" target="_blank">
        Danussh PortFolio
      </a>
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
  let history = useHistory();

  window.addEventListener("popstate", () => {
    history.push("/");
    window.location.replace("/");
  });

  const [open, setOpen] = useState(false);

  window.addEventListener("popstate", () => {
    history.push("/");
    window.location.replace("/");
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get("email"),
      password: data.get("password"),
    };

    axios
      .post("https://employeebackendjwt.herokuapp.com/login", body)
      .then((resp) => {
        console.log(resp.data.token)
        sessionStorage.setItem("accesToken", JSON.stringify(resp.data.token));
        toast.success("Login Sucessfully", {
          position: "top-center",
          autoClose: 5000,
        });
        history.push("/dashboard");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.message);
        setOpen(false);

        if (err.message === "Request failed with status code 401") {
          toast.error("Invalid Password!", {
            position: "top-right",
            autoClose: 3000,
          });
        }

        if (err.message === "Request failed with status code 400") {
          toast.error("Email Not Registered", {
            position: "top-right",
            autoClose: 3000,
          });
        }

        if (err.message === "Request failed with status code 500") {
          toast.error("Try Again Later", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      });
  };

  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              validate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                type="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register"> {"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />
    </>
  );
};

export default Login;