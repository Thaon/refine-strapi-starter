import React from "react";

import { Grid, Button, TextField, Box, Card } from "@pankod/refine-mui";

import { toast } from "react-toastify";
import axios from "utils/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function PasswordReset() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const resetPassword = async function () {
    if (password === "") {
      toast.warning("Enter a valid password");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    try {
      await axios.post("/api/auth/reset-password", {
        code: token,
        password,
        passwordConfirmation: confirmPassword,
      });

      toast.success("Password updated");
      navigate("/login");
    } catch (err) {
      toast.error("Error updating password");
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
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 500,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    p: 2,
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Confirm password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={resetPassword}
                      >
                        Reset password
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
