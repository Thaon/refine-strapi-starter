import React from "react";

import { useRegister, useLogin } from "@pankod/refine-core";
import {
  Grid,
  Button,
  TextField,
  Box,
  Card,
  Divider,
} from "@pankod/refine-mui";
import { toast } from "react-toastify";

export default function Register() {
  const { mutate: register } = useRegister();
  const { mutate: login } = useLogin();

  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(
      {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      },
      {
        onSuccess: () => {
          toast.success("User created successfully!");
          login(
            {
              email: e.target.email.value,
              password: e.target.password.value,
            },
            {
              onSuccess: () => {
                // go to the page the user was trying to access before being redirected to the login page
                const to = params.get("to");
                if (to) {
                  window.location = to;
                }
              },
            }
          );
        },
      }
    );
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        style={{
          height: "100vh",
        }}
      >
        <Grid
          item
          xs={11}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Card sx={{ borderBottom: 0, padding: 3, minWidth: 300 }}>
            <Grid container spacing={3} p={3}>
              <Grid item xs={12} container justifyContent="center">
                <img
                  src="/logo.png"
                  alt="Logo"
                  style={{ height: 80, objectFit: "contain" }}
                />
              </Grid>
              <Grid item container justifyContent="center">
                <h1 level={3}>Dashboard Register</h1>
              </Grid>
            </Grid>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              autoComplete="off"
            >
              <TextField
                name="username"
                label="Nome"
                rules={[{ required: true }]}
                placeholder="Nome"
                required
                defaultValue={params.get("username")}
              />
              <Divider sx={{ my: 1 }} />
              <TextField
                name="email"
                label="Email"
                rules={[{ required: true }]}
                placeholder="Email"
                required
                defaultValue={params.get("email")}
              />
              <TextField
                name="password"
                label="Password"
                rules={[{ required: true }]}
                placeholder="Password"
                required
                defaultValue={params.get("password")}
              />
              <Button type="submit" variant="contained">
                Register
              </Button>
              <div style={{ marginBottom: "12px" }}>
                <a
                  style={{
                    float: "right",
                    fontSize: "14px",
                    color: "#00bcd4",
                  }}
                  href={
                    "/login" +
                    (params.get("to") ? "?to=" + params.get("to") : "")
                  }
                >
                  Already have an account? Login
                </a>
              </div>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
