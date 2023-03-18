import React from "react";

import { useLogin } from "@pankod/refine-core";
import { Grid, Button, TextField, Box, Card } from "@pankod/refine-mui";

export default function Login() {
  const { mutate: login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      username: e.target.username.value,
      password: e.target.password.value,
    });
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
                <h1 level={3}>Dashboard Login</h1>
              </Grid>
            </Grid>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column" }}
              autoComplete="off"
            >
              <TextField
                name="username"
                label="Email"
                rules={[{ required: true }]}
                placeholder="Email"
                required
                autoFocus
                sx={{ mb: 2 }}
              ></TextField>
              <TextField
                name="password"
                label="Password"
                rules={[{ required: true }]}
                style={{ marginBottom: "12px" }}
                type="password"
                placeholder="●●●●●●●●"
                required
              ></TextField>
              <div style={{ marginBottom: "12px" }}>
                <a
                  style={{
                    float: "right",
                    fontSize: "12px",
                    color: "#00bcd4",
                  }}
                  href="/forgot-password"
                >
                  Forgot Password?
                </a>
              </div>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
