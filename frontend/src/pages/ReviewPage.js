import React, { useState, useEffect, useCallback } from "react";
import { Grid, TextField, Button } from '@mui/material';
import axios from "axios"
import ExperienceButtons from "../components/ReviewPage/ExperienceButtons";
import Reviews from "../components/ReviewPage/Reviews";


function ReviewPage() {

    const [experienceID, setExperienceID] = useState("");
    const [exps, setExps] = useState([])
    const [expReview, setExpReview] = useState([])
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");


    const handleReviewChange = ({ target }) => {
        console.log(exps)
        setReview(target.value);
    };

    const handleRatingChange = ({ target }) => {
        setRating(target.value);
    };

    const postReview = () => {

        const data = {
            rating: rating,
            review: review,
            expID: experienceID,
            userID: "35"
        };        
        axios
            .post("/write-review", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    
    const updateExperiences = ( target ) => {
        setExperienceID(target)
        axios
            .get("/get-reviews", {
                params: {
                    expID: experienceID
                }
            })
            .then((resp) => {
                //Do summin
                setExpReview(resp.data.reviews)

            })
            .catch(err => console.log(err));
    };
    
    const getExperiences = () =>{
        axios
        .get("/get-experiences")
        .then((resp) => {
            console.log(resp.data)
            setExps(resp.data.experiences)
        })
        .catch(err => console.log(err));
    };
        
    useEffect(() => {
        getExperiences()
    }, []);


    return (
        <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6}>
                <h3>Select an Experience:</h3>
                <ExperienceButtons exps={exps} updateExperiences={updateExperiences}></ExperienceButtons>
            </Grid>
            <Grid item xs={3}>
                <h3>Reviews</h3>
                <Reviews expReview = {expReview}></Reviews>
                <h3>Write a Review</h3>
                <TextField
                    id="outlined-multiline-static"
                    label="Review"
                    fullWidth
                    multiline
                    rows={10}
                    onChange={handleReviewChange} 
                    value={review}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Rating (0-10)"
                    fullWidth
                    multiline
                    onChange={handleRatingChange} 
                    value={rating}
                />
                <Button variant="contained" onClick={postReview}>Post Review</Button>
            </Grid>
        </Grid>
    )
}

export default ReviewPage