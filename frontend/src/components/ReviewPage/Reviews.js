import { Grid, Button } from '@mui/material';



export default function Reviews(){

    const experienceName = ["cucking", "sadd", "dass"];
    const therapistName = ["may", "saad", "pail"];
    const startTime = ["1", "2", "3"];

    return(
        <div className="Reviews" style={{
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
                    {startTime}
                </Grid>
                <Grid item xs={3}>
                        <Button variant="contained" size="small">book</Button>
                </Grid>
                <Grid item xs={3}>
                        <Button variant="contained" size="small">delete</Button>
                </Grid>
            </Grid>
        </div>
    )
}