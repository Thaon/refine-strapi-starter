import React from "react";

import { Grid, Button, TextField, Box, Card } from "@pankod/refine-mui";

import { toast } from "react-toastify";
import axios from "utils/axios";
import { useNavigate } from "react-router-dom";

export default function PasswordForgot() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");

  const resetPasswordRequest = async function () {
    if (email === "") {
      toast.warning("Enter a valid email address");
      return;
    }

    try {
      await axios.post("/api/auth/forgot-password", {
        email,
      });

      toast.success("Email sent");
      navigate("/login");
    } catch (err) {
      toast.error("Error sending email");
      console.error("An error occurred:", err);
    }
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
                <h1 level={3}>Forgot Password</h1>
              </Grid>
            </Grid>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column" }}
              autoComplete="off"
            >
              <TextField
                name="email"
                label="Email"
                rules={[{ required: true }]}
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                color="primary"
                onClick={resetPasswordRequest}
              >
                Send Link
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
