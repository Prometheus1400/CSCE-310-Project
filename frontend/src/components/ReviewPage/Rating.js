import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


/*
    Returns an output of stars depending on the rating of the corresponding reviews
*/

export default function Rating(props){

    const {rating} = props

    const ratingStars = (rating) => {
        let list = []
        console.log(rating)
        for(let i = 0; i < 10; i += 1){
            if( i < rating ){
                list.push(<StarRateIcon fontSize='medium'></StarRateIcon>)
            }
            else{
                list.push(<StarOutlineIcon fontSize='medium'></StarOutlineIcon>)
            }
        }
        console.log(list)
        return(list)
    };

    return(
        <>
        {ratingStars(rating)}
        </>
    )

}