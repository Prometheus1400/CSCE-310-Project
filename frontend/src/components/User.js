import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ProfileFuncContext } from '../context/ProfileFuncContext';
import { UserContext } from "../context/UserContext"
import {Grid, Button} from "@mui/material"
import { useContext} from "react"

export default function User(props) {
    const { user_id, user_first_name, user_last_name, user_email, user_phone, user_password, is_admin, is_therapist } = props.item
    const { setFormData, setOpen, setEditMode } = props
    const { deleteUser } = useContext(ProfileFuncContext)
    const { user } = useContext(UserContext)

    const handleClickOpen = () => {
        setOpen(true)
        setEditMode(true)
        setFormData({
            // userID: user_id,
            userFName: user_first_name,
            userLName: user_last_name,
            userEmail: user_email,
            userPassword: user_password,
            userPhone: user_phone,
            isAdmin: is_admin,
            isTherapist: is_therapist,
        })
    }
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
            </div>
        )
}