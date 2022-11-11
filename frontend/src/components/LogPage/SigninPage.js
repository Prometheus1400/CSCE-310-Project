import * as React from "react"
import "./styles/LoginPage.css"
import Logo from "./styles/logo.png"
import { Grid, TextField, Button, Stack, Checkbox, FormGroup, FormControlLabel } from "@mui/material"
import { Link } from 'react-router-dom';

function SigninPage() {
    return (
      <div className="SigninPage">
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
                    <TextField id="standard-basic" label="Name" variant="standard" alt="SigninName"></TextField>
                    <TextField id="standard-basic" label="Age" variant="standard" alt="SigninAge"></TextField>
                    <TextField id="standard-basic" label="Username" variant="standard" alt="SigninUsername"></TextField>
                    <TextField id="standard-basic" label="Password" variant="standard" alt="SigninPassword"></TextField>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox  />} label="Admin" />
                        <FormControlLabel control={<Checkbox />} label="User" />
                    </FormGroup>
                    <Button variant="contained">Sign Up</Button>
                    <p>Have an account? 
                        <Link to="/">
                            <Button variant="text">Log in</Button> 
                        </Link>
                    </p>
                </Stack>
            </Grid>
        </Grid>
      </div>
    );
}
  
export default SigninPage;
  