import { Grid, Container } from '@mui/material';
import { fontSize } from '@mui/system';

export default function Reviews(props){

    const {expReview} = props
    console.log("EXP REVIEW", expReview)

    
    const expReviews = expReview?.map((rev) => {
        console.log(rev)
        return (
            <>
            <Container className="ReviewBox" maxWidth="lg" sx={{
                color: 'rgb(0, 0, 0)',
                backgroundColor: 'rgb(197, 197, 197)',
                fontSize: '10px',
                padding: "10px",
                textAlign: "center",
                borderRadius: "10px 10px 10px 10px",
                width: "auto",
                margin: "10px",
            }}>
                Rating: {rev.rating} <br></br>
                Review: {rev.review}
            </Container>
            </>
        )
    });
    
    

    if (expReview === undefined){
        return(

            <div className = "Button">
                <h1>F</h1>
            </div>
        )
    }
    else{
        return(
            <div className = "Button">
                <h1>{expReviews}</h1>
            </div>

        )
    }

}