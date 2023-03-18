import { useState, useEffect } from "react";

import { Grid, Card } from "@pankod/refine-mui";

import axios from "utils/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

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
    </Grid>
  );
}
