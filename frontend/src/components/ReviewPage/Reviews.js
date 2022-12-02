import { Container } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

export default function Reviews(props){

    const { expReview } = props
    const { deleteReview } = props
    const { updateReview } = props
    const { user } = useContext(UserContext)

    
    const expReviews = expReview?.map((rev) => {
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
                Rating: {rev.rating} 
                {(user.isAdmin || user.userID === rev.user_id) &&
                    <>
                    <EditIcon fontSize="small"
                        onClick={() => updateReview(rev.review_id)}
                        variant="contained"
                        size="small"
                        sx={{
                            float: 'right'
                     }}/>
                    <DeleteIcon fontSize="small"
                        onClick={() => deleteReview(rev.review_id)}
                        variant="contained"
                        size="small"
                        sx={{
                            float: 'right'
                        }} />
                    </>
                }
                <br></br>
                Review: {rev.review}
            </Container>
            </>
        )
    });
    
    

    if (expReview === undefined){
        return(

            <div className = "Button">
                <h1 className="textHeaders"> ... </h1>
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