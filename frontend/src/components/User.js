import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ProfileFuncContext } from '../context/ProfileFuncContext';
import { UserContext } from "../context/UserContext"
import { Grid, Button, TextField, Dialog, DialogActions, DialogContent, InputLabel, DialogTitle, FormControl, Checkbox, FormGroup, FormControlLabel, Select, MenuItem } from "@mui/material"
import React, { useContext, useState, useEffect } from "react"

export default function User(props) {
    const { user_id, user_first_name, user_last_name, user_email, user_phone, user_password, is_admin, is_therapist } = props.item
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const {updateUserAdmin} = useContext(ProfileFuncContext)
    const { deleteUser } = useContext(ProfileFuncContext)
    const [formData, setFormData] = useState({
        userID: "",
        userFName: "",
        userLName: "",
        userEmail: "",
        userPassword: "",
        userPhone: "",
        isAdmin: false,
        isTherapist: false,
    })
    const handleClickOpen = () => {
        setOpen(true)
        setEditMode(true)
        setFormData({
            userID: user_id,
            userFName: user_first_name,
            userLName: user_last_name,
            userEmail: user_email,
            userPassword: user_password,
            userPhone: user_phone,
            isAdmin: is_admin,
            isTherapist: is_therapist,
        })
    }
     const handleFormChange = (event) => {
        setFormData((prev) => {
            return ({
                ...prev,
                [event.target.name]: event.target.value
            })
        })
    }
    const handleClose = () => {
        setOpen(false)
        setEditMode(false)
        setFormData({
            userID: "",
            userFName: "",
            userLName: "",
            userEmail: "",
            userPassword: "",
            userPhone: "",
            isAdmin: "",
            isTherapist: "",
        })
    };
    const handleSubmit = () => {
        console.log("updating user!", formData)
        updateUserAdmin({
            userID: formData.userID,
            fname: formData.userFName,
            lname: formData.userLName,
            email: formData.userEmail,
            password: formData.userPassword,
            phone: formData.userPhone,
            is_admin: formData.isAdmin,
            is_therapist: formData.isTherapist,
        })
        handleClose()
    }
    if (props === undefined){
        return(
            <div className = "Button">
                <h1 className="textHeaders"> Loading User Data... </h1>
            </div>
        )
    }
    else{
        return (
            <div className="User" style={{
                minWidth: "350px",
                fontSize: "10px",
                borderRadius: "10px",
                paddingTop: "5px",
                paddingBottom: "5px",
                marginTop: "5px",
                backgroundColor: "rgb(37, 43, 50)",
                boxShadow: "0.5px 1.5px 2px 0.5px black",
            }}>
                <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center" sx={{
                ml: -2,
                color: "rgb(203, 207, 211)",
                }}>
                    <Grid item xs={2} sx={{ ml: 0 }}>
                        {user_first_name + " " + user_last_name}
                    </Grid>
                    <Grid item xs={2} sx={{ ml: 0 }}>
                        {user_email}
                    </Grid>
                    <Grid item xs={2} sx={{ ml: 0 }}>
                        {user_phone}
                    </Grid>
                    <Grid item xs={2} sx={{ ml: 0 }}>
                        {"is admin: " + is_admin}
                    </Grid>
                    <Grid item xs={2} sx={{ ml: 0 }}>
                        {"is therapist: " + is_therapist}
                    </Grid>
                    <Grid item xs={1}>
                        <div style={{ display: "flex" }}>
                            <Button style={{ maxWidth: "32px", minWidth: "32px" }} onClick={() => { handleClickOpen() }} variant="contained" size="small"><EditIcon /></Button>
                            <Button style={{ marginLeft: "2px", maxWidth: "32px", minWidth: "32px" }} onClick={() => { deleteUser(user_id) }} variant="contained" size="small"><DeleteIcon /></Button>
                        </div>
                    </Grid>
                </Grid>
                <Dialog open={open} onClose={handleClose}>
                <DialogTitle>EDIT USER</DialogTitle>
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
                   <br></br>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="isAdmin">Is Admin?</InputLabel>
                        <Select
                            id="isAdmin"
                            name="isAdmin"
                            value={formData.isAdmin}
                            label="Admin"
                            onChange={handleFormChange}
                            sx={{ minWidth: 200 }}
                        >
                            <MenuItem value="true">
                                <em>Yes</em>
                            </MenuItem>
                            <MenuItem value="false">
                                <em>No</em>
                            </MenuItem>
                        </Select>
                    </FormControl>
                   <br></br>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="isTherapist">Is Therapist?</InputLabel>
                        <Select
                            id="isTherapist"
                            name="isTherapist"
                            value={formData.isTherapist}
                            label="Therapist"
                            onChange={handleFormChange}
                            sx={{ minWidth: 200 }}
                        >
                            <MenuItem value="true">
                                <em>Yes</em>
                            </MenuItem>
                            <MenuItem value="false">
                                <em>No</em>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
            </div>
        )
    }
}