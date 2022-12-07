import User from "./User"
import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { Button, TextField, Dialog, DialogActions, DialogContent, InputLabel, DialogTitle, FormControl, Checkbox, FormGroup, FormControlLabel } from "@mui/material"
import { ProfileFuncContext } from "../context/ProfileFuncContext";

function UserList(props) {
    const {users} = props
    const { user } = useContext(UserContext)
    const {adminAddUser} = useContext(ProfileFuncContext)
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({
        userFName: "",
        userLName: "",
        userEmail: "",
        userPassword: "",
        userPhone: "",
        isAdmin: 'f',
        isTherapist: 'f',
    })
    console.log("props,", props)
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
    };
    const handleClose = () => {
        setOpen(false)
        setEditMode(false)
        setFormData({
            userFName: "",
            userLName: "",
            userEmail: "",
            userPassword: "",
            userPhone: "",
            isAdmin: 'f',
            isTherapist: 'f',
        })
    };
    const handleSubmit = () => {
        console.log("adding user!", formData)
        adminAddUser({
            ...formData,
        })
        handleClose()
    }
    let count = 0
    const usrComponents = users?.map((a) => {
        count++
        return (
            <User
                item={a}
                key={count}
                setFormData={setFormData}
                setOpen={setOpen}
                setEditMode={setEditMode}
            />
        )
    })

    if (users == undefined){
        return(
            <div className="UserList" style={{
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
            <h3>All Users &zwnj; &zwnj;  
                <Button onClick={handleClickOpen} variant="contained" size="small"> Add User </Button>
            </h3>
            </div>
        )
    } else {
    return (
        <div className="UserList" style={{
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
            <h3>All Users &zwnj; &zwnj;  
                <Button onClick={handleClickOpen} variant="contained" size="small"> Add User </Button>
            </h3>
            {/* <Button onClick={handleClickOpen}>Update Profile</Button></div> */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ADD USER</DialogTitle>
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
                    <FormGroup>
                         <FormControlLabel
                            control={
                            <Checkbox
                                checked={formData.is_therapist}
                                value={formData.is_therapist}
                                onChange={handleFormChange}
                                color="primary"
                            />
                            }
                            label="Therapist"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={formData.is_admin}
                                value={formData.is_admin}
                                onChange={handleFormChange}
                                color="primary"
                            />
                            }
                            label="Admin"
                        />
                     </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
            <div className="scrollable" style={{ height: "100%", overflowY: "auto" }}>
                {usrComponents}
            </div>
        </div>
    )
    }
}

export default UserList