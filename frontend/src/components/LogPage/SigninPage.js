import React, { useState } from "react";
import "./styles/LoginPage.css"
import Logo from "./styles/logo.png"
import { Grid, TextField, Button, Stack, Checkbox, FormControlLabel } from "@mui/material"
import { Link } from 'react-router-dom';
import axios from "axios";

function SigninPage() {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isTherapist, setTherapist] = useState([]);

    const handleFirstnameChange = ({ target }) => {
        setFirstname(target.value);
    };

    const handleLastnameChange = ({ target }) => {
        setLastname(target.value);
    };

    const handlePhoneChange = ({ target }) => {
        setPhone(target.value);
    };

    const handleEmailChange = ({ target }) => {
        console.log(target);
        setEmail(target.value);
    };

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value);
    };

    const handleTherapist = ({ target }) => {
        setTherapist(target.checked);
    };

    const handleClick = () => {

        const data = {
            email: email,
            password: password,
            phone: phone,
            fname: firstname,
            lname: lastname,
            isTherapist: isTherapist
        };

        axios
            .post("/createAccount", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
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
                    <TextField id="standard-basic" label="First Name" variant="standard" alt="SigninFirstName" onChange={handleFirstnameChange} value={firstname}></TextField>
                    <TextField id="standard-basic" label="Last Name" variant="standard" alt="SigninLastName" onChange={handleLastnameChange} value={lastname}></TextField>
                    <TextField id="standard-basic" label="Phone Number" variant="standard" alt="SigninPhone" onChange={handlePhoneChange} value={phone}></TextField>
                    <TextField id="standard-basic" label="Email" variant="standard" alt="SigninEmail" onChange={handleEmailChange} value={email}></TextField>
                    <TextField id="standard-basic" label="Password" variant="standard" alt="SigninPassword" onChange={handlePasswordChange} value={password}></TextField>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Are you a therapist?" onChange={handleTherapist} value={isTherapist}/>
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
  