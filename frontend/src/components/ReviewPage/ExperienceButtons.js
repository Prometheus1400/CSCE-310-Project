import { Button } from '@mui/material';


export default function ExperienceButtons(props){

    const {exps} = props
    const {updateExperiences} = props
    
    
    console.log(exps)

    
    const expButton = exps.map((exp) => {
        return (
            <Button
                value={exp.experience_id}
                onClick= { () => updateExperiences()}
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