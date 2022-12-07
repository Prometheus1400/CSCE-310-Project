import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useState } from 'react';
import { ProfileFuncContext } from '../context/ProfileFuncContext';
import { UserContext } from '../context/UserContext';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField, Dialog, DialogActions, DialogContent, InputLabel, DialogTitle, Select, MenuItem, FormControl } from "@mui/material"

export default function Profile(props) {
    const userInfo = props
    const { user } = useContext(UserContext)
    const { updateUser } = useContext(ProfileFuncContext)
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({
        userID: "",
        userFName: "",
        userLName: "",
        userEmail: "",
        userPassword: "",
        userPhone: "",
    })

    const handleFormChange = (event) => {
        setFormData((prev) => {
            return ({
                ...prev,
                [event.target.name]: event.target.value
            })
        })
    }
    const handleClickOpen = () => {
        setOpen(true)
        setEditMode(true)
        setFormData({
            userID: userInfo.userProfile.user_id,
            userFName: userInfo.userProfile.user_first_name,
            userLName: userInfo.userProfile.user_last_name,
            userEmail: userInfo.userProfile.user_email, // in hours
            userPassword: userInfo.userProfile.user_password,
            userPhone: userInfo.userProfile.user_phone,
        })
    };
    const handleClose = () => {
        setOpen(false)
        setEditMode(false)
    };

    const handleSubmit = () => {
        if (editMode) {
            console.log("data being submitted: ", formData)
            updateUser({
                ...formData,
            })
        }
        handleClose()
    }
    if (props == undefined) {
        <div className="Profile" style={{
            height: "450px",
            backgroundColor: "rgb(26, 32, 39)",
            padding: "10px",
            width: "500px",
            margin: "10px",
            color: "rgb(243, 246, 249)",
            textAlign: "center",
            borderRadius: "10px 10px 10px 10px",
            position: user.isAdmin ? "static" : "absolute",
            left: "0px",

        }}><h3>Loading Profile Data</h3></div>
    } else {
    return (
        <div className="Profile" style={{
            height: "450px",
            backgroundColor: "rgb(26, 32, 39)",
            padding: "10px",
            width: "500px",
            margin: "10px",
            color: "rgb(243, 246, 249)",
            textAlign: "center",
            borderRadius: "10px 10px 10px 10px",
            position: user.isAdmin ? "static" : "absolute",
            left: "0px",

        }}>
        <div><h3>My Profile &zwnj; &zwnj;  
        </h3>
        <h5>First Name: {userInfo.userProfile.user_first_name}</h5>
        <h5>Last Name: {userInfo.userProfile.user_last_name}</h5>
        <h5>Email: {userInfo.userProfile.user_email}</h5>
        <h5>Phone Number: {userInfo.userProfile.user_phone}</h5>
        <Button onClick={handleClickOpen}>Update Profile</Button></div>
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>EDIT PROFILE</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userFName"
                            name="userFName"
                            label="First Name"
                            type="text"
                            value={formData.userFName}
                            onChange={handleFormChange}
                        />
                    </FormControl>
                    <br></br>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userLName"
                            name="userLName"
                            label="Last Name"
                            type="text"
                            value={formData.userLName}
                            onChange={handleFormChange}
                        />
                    </FormControl>
                    <br></br>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userEmail"
                            name="userEmail"
                            label="Email"
                            type="text"
                            value={formData.userEmail}
                            onChange={handleFormChange}
                        />
                    </FormControl>
                    <br></br>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userPhone"
                            name="userPhone"
                            label="Phone"
                            type="text"
                            value={formData.userPhone}
                            onChange={handleFormChange}
                        />
                    </FormControl>
                    <br></br>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userPassword"
                            name="userPassword"
                            label="Password"
                            type="text"
                            value={formData.userPassword}
                            onChange={handleFormChange}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
    } 
}