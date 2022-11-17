import React, { useState } from "react";
import "./styles/LoginPage.css"
import Logo from "./styles/logo.png"
import { Grid, TextField, Button, Stack, Checkbox, FormGroup, FormControlLabel } from "@mui/material"
import { Link } from 'react-router-dom';

function SigninPage() {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleFirstnameChange = ({ target }) => {
        setFirstname(target.value);
    };

    const handleLastnameChange = ({ target }) => {
        setLastname(target.value);
    };

    const handleUsernameChange = ({ target }) => {
        setUsername(target.value);
    };

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value);
    };

    const handleClick = () => {
        console.log(firstname);
        console.log(lastname);
        console.log(username);
        console.log(password);
    };

    return (
      <div className="SigninPage">
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={6} style={{textAlign: "center"}}>
                <img src={Logo} className="AppLogo" alt="logo"></img>
            </Grid>
            <Grid item xs={6}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <TextField id="standard-basic" label="Firstname" variant="standard" alt="SigninFirstName" onChange={handleFirstnameChange} value={firstname}></TextField>
                    <TextField id="standard-basic" label="Lastname" variant="standard" alt="SigninLastName" onChange={handleLastnameChange} value={lastname}></TextField>
                    <TextField id="standard-basic" label="Username" variant="standard" alt="SigninUsername" onChange={handleUsernameChange} value={username}></TextField>
                    <TextField id="standard-basic" label="Password" variant="standard" alt="SigninPassword" onChange={handlePasswordChange} value={password}></TextField>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox  />} label="Admin" />
                        <FormControlLabel control={<Checkbox />} label="User" />
                    </FormGroup>
                    <Button variant="contained" onClick={handleClick}>Sign Up</Button>
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
  