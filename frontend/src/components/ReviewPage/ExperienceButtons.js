import { Button } from '@mui/material';


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