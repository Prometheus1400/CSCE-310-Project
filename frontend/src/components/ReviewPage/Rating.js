import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export default function Rating(props){

    const {rating} = props
    //const [stars, setStars] = useState([])

    const ratingStars = (rating) => {
        let list = []
        console.log(rating)
        //setStars([])
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