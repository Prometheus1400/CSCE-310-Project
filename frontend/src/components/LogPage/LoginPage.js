import * as React from "react"
import "./styles/LoginPage.css"
import Logo from "./styles/logo.png"
import { Grid, TextField, Button, Stack } from "@mui/material"
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
      <div className="App">
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={6} style={{textAlign: "center"}}>
                <img src={Logo} className="AppLogo"></img>
            </Grid>
            <Grid item xs={6}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <TextField id="standard-basic" label="Username" variant="standard" alt="LoginUsername"></TextField>
                    <TextField id="standard-basic" label="Password" variant="standard" alt="LoginPassword"></TextField>
                    <Button variant="contained">Log In</Button>
                    <p>Don't have an account? 
                        <Link to="/signin">
                            <Button variant="text">Sign in</Button> 
                        </Link>
                    </p>
                </Stack>
            </Grid>
        </Grid>
      </div>
    );
}
  
export default LoginPage;
  