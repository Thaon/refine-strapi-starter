import { useState, useEffect } from "react";

import {
  Grid,
  Card,
  TextField,
  Button,
  Stack,
  Divider,
} from "@pankod/refine-mui";

import { toast } from "react-toastify";

import axios from "utils/axios";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get("/api/users/me");
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <Grid container spacing={5} justifyContent="space-evenly">
      <Grid item md={5} xs={11} sx={{ mt: -7, mb: 3 }}>
        <Card sx={{ borderRadius: 10, height: "100%" }}>
          <Grid
            item
            xs={12}
            container
            alignItems="space-between"
            p={3}
            sx={{ height: "100%" }}
          >
            <Grid item xs={12} container justifyContent="center">
              {user && (
                <h1 style={{ paddingTop: 10 }}>{`Welcome ${user.username}`}</h1>
              )}
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid item xs={12} container justifyContent="space-evenly">
        {/* ACCOUNT --------------------------------------------------------------------------- */}
        <Grid item md={5} xs={11} mb={2}>
          <Card sx={{ borderRadius: 5, height: "100%" }}>
            <Grid
              item
              xs={12}
              container
              alignItems="space-between"
              justifyContent="center"
              p={3}
              sx={{ height: "100%" }}
            >
              <h1>User Info</h1>
              <Grid
                item
                xs={12}
                sx={{ padding: 1, width: "100%" }}
                container
                direction={"row"}
                justifyContent="space-evenly"
              >
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ pointerEvents: "none" }}
                  fullWidth
                  label="Username"
                  value={user?.username}
                  variant="outlined"
                />
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ pointerEvents: "none" }}
                  fullWidth
                  label="Email"
                  value={user?.email}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* PASSWORD --------------------------------------------------------------------- */}
        <Grid item md={5} xs={11} mb={2}>
          <Card sx={{ borderRadius: 5, height: "100%" }}>
            <Grid
              item
              xs={12}
              container
              alignItems="space-between"
              justifyContent="center"
              p={3}
              sx={{ height: "100%" }}
            >
              <h1>Change Password</h1>
              <Grid item xs={12} sx={{ padding: 1, width: "100%" }}>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    label="Current Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                  />
                  <Divider
                    sx={{
                      width: "100%",
                      my: 1,
                    }}
                  />
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    variant="outlined"
                  />
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      if (newPassword === confirmPassword) {
                        try {
                          let res = await axios.post(
                            "/api/auth/change-password",
                            {
                              currentPassword: password,
                              password: newPassword,
                              passwordConfirmation: confirmPassword,
                            }
                          );
                          console.log(res.data);
                          toast.success("Password Updated");
                        } catch (error) {
                          console.log(error);
                          toast.error("Error Updating Password");
                        }
                        setPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                      }
                    }}
                  >
                    Update Password
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent="space-evenly" mb={2}></Grid>
    </Grid>
  );
}
