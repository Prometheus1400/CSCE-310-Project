import { Grid, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { AptFuncContext } from '../context/AptFuncContext';
import { UserContext } from '../context/UserContext';
import AddIcon from '@mui/icons-material/Add';

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export default function Appointment(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const { experience_name, appointment_id, therapist_first_name, therapist_last_name, appointment_start_time, appointment_end_time } = props.item
    const { canBook, canRemove } = props
    const { handleUserBook, handleUserUnbook, handleAdminDelete } = useContext(AptFuncContext)
    const { user } = useContext(UserContext)

    const startDate = new Date(appointment_start_time)
    const endDate = new Date(appointment_end_time)
    const startDay = monthNames[startDate.getMonth()] + " " + startDate.getDate()
    const startTime = formatAMPM(startDate)
    const endTime = formatAMPM(endDate)

    return (
        <div className="Appointment" style={{
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
                <Grid item xs={2}>
                    {experience_name}
                </Grid>
                <Grid item xs={2} sx={{ ml: 0 }}>
                    {therapist_first_name + " " + therapist_last_name}
                </Grid>
                <Grid item xs={5} sx={{mr:1}}>
                    {startDay}  {startTime} : {endTime}
                </Grid>
                {!user.isAdmin && canBook &&
                    <Grid item xs={1}>
                        <Button onClick={() => { handleUserBook(appointment_id, user.userID) }} variant="contained" size="small"><AddIcon fontSize="small"/></Button>
                    </Grid>
                }
                {!user.isAdmin && canRemove &&
                    <Grid item xs={1}>
                        <Button onClick={() => { handleUserUnbook(appointment_id, user.userID) }} variant="contained" size="small"><DeleteIcon fontSize="small"/></Button>
                    </Grid>
                }
                {user.isAdmin &&
                    <Grid item xs={1}>
                        <Button onClick={() => { handleAdminDelete(appointment_id) }} variant="contained" size="small"><DeleteIcon /></Button>
                    </Grid>
                }
            </Grid>
        </div>
    )
}