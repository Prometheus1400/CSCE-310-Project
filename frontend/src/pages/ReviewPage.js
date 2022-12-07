import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from '@mui/material';
import axios from "axios"
import ExperienceButtons from "../components/ReviewPage/ExperienceButtons";
import Reviews from "../components/ReviewPage/Reviews";
import "../styles/HomePage.css"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"


function ReviewPage() {

    const [experienceID, setExperienceID] = useState("")
    const [experienceName, setExperienceName] = useState("")
    const [exps, setExps] = useState([])
    const [expReview, setExpReview] = useState([])
    const [review, setReview] = useState("")
    const [rating, setRating] = useState("")
    const { user } = useContext(UserContext)


    /*
        handles changes to the rating and review text fields
    */

    const handleReviewChange = ({ target }) => {
        console.log(exps)
        setReview(target.value);
    };

    const handleRatingChange = ({ target }) => {
        setRating(target.value);
    };

    /*
        function that executes after 'Post Review' button is hit
        will create a new entry in the review table for the specified experience 
    */

    const postReview = () => {

        const data = {
            rating: rating,
            review: review,
            expID: experienceID,
            userID: user.userID
        };        
        axios
            .post("/write-review", data)
            .then((res) => {
                updateExperiences(experienceID, experienceName)
                setRating("")
                setReview("")
                console.log(res)
            })
            .catch(err => console.log(err))
    };

    /*
        function that executes after trash icon is hit
        will delete a certain review given the review_id 
    */

    const deleteReview = ( target ) => {
        console.log("Deleting Review")

        const data = {
            revID: target
        };

        axios
            .post("/delete-review", data)
            .then((res) => {
                updateExperiences(experienceID, experienceName)
                console.log(res)
            })
            .catch(err => console.log(err))
        

        updateExperiences(experienceID, experienceName)
    }

    /*
        function that executes after pencil icon is hit
        will update an existing entry in the Review table based on the values
        in the Review and Rating text fields
    */

    const updateReview = ( target ) => {
        console.log("REVIEW_ID", target)

        const data = {
            reviewID: target,
            review: review,
            rating: rating
        };

        axios
            .post("/update-review", data)
            .then((res) => {
                updateExperiences(experienceID, experienceName)
                console.log(res)
            })
            .catch(err => console.log(err))

    }

    /*
        function that executes after any Experience Button is hit
        will populate the page with the reviews for a corresponding experience
    */

    const updateExperiences = ( id, name ) => {

        setExperienceID(id)
        setExperienceName(name)

        axios
            .get("/get-reviews", {
                params: {
                    expID: experienceID
                }
            })
            .then((resp) => {
                setExpReview(resp.data.reviews)

            })
            .catch(err => console.log(err));
    };

    /*
        function that executes on load and gets all the experiences
    */
    
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
            <Grid item xs={5}>
                <h3 className="textHeaders">Select an Experience:</h3>
                <ExperienceButtons exps={exps} updateExperiences={updateExperiences}></ExperienceButtons>
                <h3 className="textHeaders">Reviews for {experienceName}</h3>
                <Reviews expReview = {expReview} deleteReview={deleteReview} updateReview={updateReview}></Reviews>
            </Grid>
            <Grid item xs={5}>
                {!user.isAdmin &&
                    <><h3 className="textHeaders">Write or Edit a Review</h3>
                    <TextField
                        id="outlined-multiline-static"
                        className="ratingBox"
                        label="Review"
                        fullWidth
                        multiline
                        rows={10}
                        onChange={handleReviewChange}
                        value={review} /><TextField
                            id="outlined-multiline-static"
                            className="ratingBox"
                            label="Rating (0-10)"
                            color="primary"
                            fullWidth
                            multiline
                            onChange={handleRatingChange}
                            value={rating} />
                    <Button variant="contained" onClick={postReview}>Post Review</Button></>
                }
                {user.isAdmin &&
                    <>
                    <h3 className="textHeaders">Edit a Review</h3>
                    <TextField
                        id="outlined-multiline-static"
                        className="ratingBox"
                        label="Review"
                        fullWidth
                        multiline
                        rows={10}
                        onChange={handleReviewChange}
                        value={review} 
                    />
                    <TextField
                        id="outlined-multiline-static"
                        className="ratingBox"
                        label="Rating (0-10)"
                        color="primary"
                        fullWidth
                        multiline
                        onChange={handleRatingChange}
                        value={rating} 
                    />
                    </>
                }
            </Grid>
        </Grid>
    )
}

export default ReviewPage