import React, { useState } from "react";
import "./styles/LoginPage.css"
import Logo from "./styles/logo.png"
import { Grid, TextField, Button, Stack } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


function LoginPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleUsernameChange = ({ target }) => {
        setUsername(target.value);
    };

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value);
    };

    const handleClick = () => {
        var queryedUsername = "";
        var queryedPassword = "";

        const res = axios.get('/login', {
            headers: {
            'email': queryedUsername,
            'password': queryedPassword
            }
        });

        if(username === queryedUsername && password === queryedPassword){
            navigate("/home");
        }
        else{
            setErrorMessage("WRONG USERNAME OR PASSWORD!");
        }

        setUsername("")
        setPassword("")
        setErrorMessage("")
        
    };

    return (
      <div className="LoginPage">
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={6} style={{textAlign: "center"}}>
                <img src={Logo} className="AppLogo" alt="Logo"></img>
            </Grid>
            <Grid item xs={6}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <TextField id="standard-basic" label="Username" variant="standard" alt="LoginUsername" onChange={handleUsernameChange} value={username}></TextField>
                    <TextField id="standard-basic" label="Password" variant="standard" alt="LoginPassword" onChange={handlePasswordChange} value={password}></TextField>
                    <Button variant="contained" onClick={handleClick}>Log In</Button>
                    {errorMessage && <div className="error"> {errorMessage} </div>}
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
  