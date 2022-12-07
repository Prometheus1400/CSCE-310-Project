import { Button } from '@mui/material';

/*
    Creates a seperate Button for each experience that when clicked
    will load the reviews that correspond to the experience clicked
*/

export default function ExperienceButtons(props){

    const {exps} = props
    const {updateExperiences} = props
    

    const expButton = exps.map((exp) => {
        return (
            <Button
                value={exp.experience_id}
                onClick= { () => updateExperiences(exp.experience_id, exp.experience_name)}
                variant="contained"
                size='large'
            >{exp.experience_name}
            </Button>
        )
    });
    
    

    return (
        <div className = "Button">
            {expButton}
        </div>
    )

}