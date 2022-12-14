import React, { useState } from "react";
import "./styles/LoginPage.css"
import Logo from "./styles/logo-white.png"
import { Grid, TextField, Button, Stack } from "@mui/material"
import { styled } from "@mui/material/styles";
import { Link } from 'react-router-dom';
import axios from "axios"

/*
    Stylize the text fields
*/

const StyledTextField = styled(TextField)({
    '& .MuiInput-underline:before': {
        borderBottomColor: 'rgb(171, 174, 178)',
    },
    '&:hover .MuiInput-underline:before': {
        borderBottomColor: 'white',
    },
    '& label': {
        color: 'rgb(171, 174, 178)',
    },
    '&:hover label': {
        color: 'white',
    },
    '& input': {
        color: 'rgb(171, 174, 178)',
    },
});

function SigninPage() {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /*
        handles changes to the information text fields
    */

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
        setEmail(target.value);
    };

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value);
    };

    /*
        executes after 'Sign Up' button is hit
        and creates new entry in database for this user
    */

    const handleClick = () => {

        const data = {
            email: email,
            password: password,
            phone: phone,
            fname: firstname,
            lname: lastname,
        };

        console.log(data)

        axios
            .post("/createAccount", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    return (
      <div className="SigninPage" style={{color:"rgb(171, 174, 178)"}}>
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
                    <StyledTextField id="standard-basic" label="Firstname" variant="standard" alt="SigninFirstName" onChange={handleFirstnameChange} value={firstname}></StyledTextField>
                    <StyledTextField id="standard-basic" label="Lastname" variant="standard" alt="SigninLastName" onChange={handleLastnameChange} value={lastname}></StyledTextField>
                    <StyledTextField id="standard-basic" label="Email" variant="standard" alt="SigninEmail" onChange={handleEmailChange} value={email}></StyledTextField>
                    <StyledTextField id="standard-basic" label="Phone Number" variant="standard" alt="SigninPhone" onChange={handlePhoneChange} value={phone}></StyledTextField>
                    <StyledTextField id="standard-basic" label="Password" variant="standard" alt="SigninPassword" onChange={handlePasswordChange} value={password}></StyledTextField>
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
  