import React, { useState } from "react";
import { Grid, TextField, Button } from '@mui/material';


function ReviewPage() {

    const [experience, setExperience] = useState("");
    const experienceList = ["single session", "group session", "meditation session"];
    const final = [];

    const updateExperience = ({ target }) => {
        setExperience(target.value);
        console.log(experience);
    };

    for (let ex of experienceList){
        final.push(<Button
            value={ex}
            onClick={updateExperience}
            variant="contained"
            size='large'
            >{ex}
        </Button>
        );
    }

    return (
        <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6}>
                <h3>Select an Experience:</h3>
                {final}
            </Grid>
            <Grid item xs={3}>
                <h3>Reviews</h3>
                <h3>Write a Review</h3>
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