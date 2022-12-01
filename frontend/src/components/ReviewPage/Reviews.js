
export default function Reviews(props){

    const {expReview} = props
    console.log("EXP REVIEW", expReview)

    
    const expReviews = expReview?.map((rev) => {
        console.log(rev)
        return (
            <>
            <h3>Rating: {rev.rating}</h3>
            <h3>Review: {rev.review}</h3>
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