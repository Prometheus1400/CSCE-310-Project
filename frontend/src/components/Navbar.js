import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* change to icon button use therapy logo */}
                    <Button
                        onClick={() => {navigate("/home", { replace: true})}}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Home
                    </Button>
                    <Button
                        onClick={() => {navigate("/appointments", { replace: true})}}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Appointments
                    </Button>
                    <Button
                        onClick={() => {navigate("/reviews", { replace: true})}}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Reviews
                    </Button>
                    <Button
                        onClick={() => {navigate("/users", { replace: true})}}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Users
                    </Button>

                    <Button color="inherit" sx={{ marginLeft: 'auto' }}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar