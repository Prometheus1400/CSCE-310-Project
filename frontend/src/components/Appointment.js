import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { AptFuncContext } from '../context/AptFuncContext';
import { UserContext } from '../context/UserContext';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, Button } from "@mui/material"

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
    const { experience_id, experience_name, therapist_id, appointment_id, therapist_first_name, therapist_last_name, appointment_start_time, appointment_end_time } = props.item
    const { canBook, canRemove, } = props
    const { setFormData, setOpen, setEditMode } = props
    const { handleUserBook, handleUserUnbook, handleAdminDelete } = useContext(AptFuncContext)
    const { user } = useContext(UserContext)


    // setting up aptTime display
    const startDate = new Date(appointment_start_time)
    const endDate = new Date(appointment_end_time)
    const duration = (endDate.getUTCHours() + (endDate.getMinutes() / 60)) - startDate.getUTCHours()
    const startDay = monthNames[startDate.getMonth()] + " " + startDate.getDate()
    const startTime = formatAMPM(startDate)
    const endTime = formatAMPM(endDate)
    const aptTime = `${startDay} ${startTime} : ${endTime}`

    const handleClickOpen = () => {
        setOpen(true)
        setEditMode(true)
        setFormData({
            appointmentID: appointment_id,
            experienceID: experience_id,
            therapistID: therapist_id,
            startTime: appointment_start_time,
            duration: duration, // in hours
        })
    }

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
                <Grid item xs={5} sx={{ mr: 1 }}>
                    {aptTime}
                </Grid>
                {!user.isAdmin && canBook &&
                    <Grid item xs={1}>
                        <Button onClick={() => { handleUserBook(appointment_id, user.userID) }} variant="contained" size="small"><AddIcon fontSize="small" /></Button>
                    </Grid>
                }
                {!user.isAdmin && canRemove &&
                    <Grid item xs={1}>
                        <Button onClick={() => { handleUserUnbook(appointment_id, user.userID) }} variant="contained" size="small"><DeleteIcon fontSize="small" /></Button>
                    </Grid>
                }
                {user.isAdmin &&
                    <Grid item xs={1}>
                        <div style={{ display: "flex" }}>
                            <Button style={{ maxWidth: "32px", minWidth: "32px" }} onClick={() => { handleClickOpen() }} variant="contained" size="small"><EditIcon /></Button>
                            <Button style={{ marginLeft: "2px", maxWidth: "32px", minWidth: "32px" }} onClick={() => { handleAdminDelete(appointment_id) }} variant="contained" size="small"><DeleteIcon /></Button>
                        </div>
                    </Grid>
                }
            </Grid>
        </div>
    )
}