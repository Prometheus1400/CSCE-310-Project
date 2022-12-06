import React, { useState } from "react";
import "./styles/LoginPage.css"
import Logo from "./styles/logo-white.png"
import { Grid, TextField, Button, Stack } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext"
import { styled } from "@mui/material/styles";

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

function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const { setUser } = useContext(UserContext)

    const handleUsernameChange = ({ target }) => {
        setUsername(target.value);
    };

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value);
    };

    const handleClick = () => {
        axios.get('/login', {
            params: {
                email: username,
                password: password,
            }
        })
            .then((resp) => {
                const { userID, isAdmin, exists } = resp.data
                console.log("userID", userID)
                console.log("isAdmin", isAdmin)

                if (exists) {
                    setUsername("")
                    setPassword("")
                    setErrorMessage("")
                    setUser({
                        userID: userID,
                        isAdmin: isAdmin,
                    })
                    navigate("/home");
                }
                else {
                    setErrorMessage("WRONG USERNAME OR PASSWORD!");
                }
            })
    };

    return (
        <div className="LoginPage" style={{
            color: "rgb(171, 174, 178)",
            backgroundColor: "rgb(26, 32, 39)",
            margin: "10px",
            borderRadius: "10px 10px 10px 10px",
            padding: "10px",
        }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={6} style={{ textAlign: "center" }}>
                    <img src={Logo} className="AppLogo" alt="Logo"></img>
                </Grid>
                <Grid item xs={6}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <StyledTextField variant="standard" label="Username" alt="LoginUsername" onChange={handleUsernameChange} value={username}></StyledTextField>
                        <StyledTextField variant="standard" label="Password" alt="LoginPassword" type="password" onChange={handlePasswordChange} value={password}></StyledTextField>
                        <Button variant="contained" onClick={handleClick}>Log In</Button>
                        {errorMessage && <div className="error"> {errorMessage} </div>}
                        <p>Don't have an account?
                            <Link style={{ textDecoration: 'none' }} to="/signin">
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
