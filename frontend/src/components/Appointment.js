import { Grid, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { AptFuncContext } from '../context/AptFuncContext';
import { UserContext } from '../context/UserContext';

export default function Appointment(props) {
    const { experienceName, appointmentID, therapistName, startTime, endTime } = props.item
    const { canBook, canRemove } = props
    const { handleUserBook, handleUserRemove, handleAdminDelete } = useContext(AptFuncContext)
    // get from UserContext
    const {user} = useContext(UserContext)

    return (
        <div className="Appointment" style={{
            width: "280px",
            fontSize: "10px",
            borderRadius: "10px",
            backgroundColor: "lightblue",
            paddingTop: "5px",
            paddingLeft: "10px",
            paddingBottom: "5px",
            marginTop: "2px"
        }}>
            <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={3}>
                    {experienceName}
                </Grid>
                <Grid item xs={3}>
                    {therapistName}
                </Grid>
                <Grid item xs={3}>
                    {startTime} : {endTime}
                </Grid>
                {!user.isAdmin && canBook &&
                    <Grid item xs={3}>
                        <Button onClick={() => { handleUserBook(appointmentID, user.userID) }} variant="contained" size="small">book</Button>
                    </Grid>
                }
                {!user.isAdmin && canRemove &&
                    <Grid item xs={3}>
                        <Button onClick={() => { handleUserRemove(appointmentID, user.userID) }} variant="contained" size="small"><DeleteIcon /></Button>
                    </Grid>
                }
                {user.isAdmin &&
                    <Grid item xs={3}>
                        <Button onClick={() => { handleAdminDelete(appointmentID) }} variant="contained" size="small"><DeleteIcon /></Button>
                    </Grid>
                }
            </Grid>
        </div>
    )
}