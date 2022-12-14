import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Navbar() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" enableColorOnDark>
                <Toolbar>
                    {/* change to icon button use therapy logo */}
                    <Button
                        onClick={() => { navigate("/home", { replace: true }) }}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Home
                    </Button>
                    <Button
                        onClick={() => { navigate("/appointments", { replace: true }) }}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Appointments
                    </Button>
                    <Button
                        onClick={() => { navigate("/reviews", { replace: true }) }}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Reviews
                    </Button>
                    <Button
                        onClick={() => { navigate("/users", { replace: true }) }}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        My Profile
                    </Button>

                    <Button color="inherit" sx={{ marginLeft: 'auto' }} onClick={() => {
                        setUser(null)
                        navigate("/", { replace: true })
                    }}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar