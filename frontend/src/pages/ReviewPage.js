import { Grid, TextField } from '@mui/material';


function ReviewPage() {
    return (
        <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6}>
                <h3>Experience Names</h3>
            </Grid>
            <Grid item xs={3}>
                <h3>Experience Names</h3>
                <TextField
                    id="outlined-multiline-static"
                    label="Review"
                    fullWidth
                    multiline
                    rows={10}
                    defaultValue="Default Value"
                />
            </Grid>
        </Grid>
    )
}

export default ReviewPage