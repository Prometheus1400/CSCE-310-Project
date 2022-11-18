import { Grid, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { AptFuncContext } from '../context/AptFuncContext';

export default function Appointment(props) {
    const { experienceName, experienceID, therapistName, startTime, endTime } = props.item
    const { canBook, canRemove } = props
    const { handleBook, handleRemove } = useContext(AptFuncContext)

    // get from UserContext
    const userID = 2

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
                {canBook &&
                    <Grid item xs={3}>
                        <Button onClick={() => { handleBook(experienceID, userID) }} variant="contained" size="small">book</Button>
                    </Grid>
                }
                {canRemove &&
                    <Grid item xs={3}>
                        <Button onClick={() => { handleRemove(experienceID, userID) }} variant="contained" size="small"><DeleteIcon /></Button>
                    </Grid>
                }
            </Grid>
        </div>
    )
}