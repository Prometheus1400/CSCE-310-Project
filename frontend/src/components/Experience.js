import { Grid, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import { AptFuncContext } from "../context/AptFuncContext";

export default function Experience(props) {
    const { experience_id, experience_name, experience_price, experience_length, experience_description } = props.item
    const { setOpen, setFormData, setEditMode } = props
    const { handleAdminDeleteExp } = useContext(AptFuncContext)

    const handleClickEdit = () => {
        console.log("handleClickEdit()")
        setEditMode(true)
        setOpen(true)
        setFormData({
            experience_name: experience_name,
            experience_length: experience_length,
            experience_price: experience_price,
            experience_description: experience_description,
            experience_id: experience_id,
        })
    }

    return (
        <div className="Experience" style={{
            minWidth: "350px",
            fontSize: "10px",
            borderRadius: "10px",
            paddingTop: "5px",
            paddingBottom: "5px",
            marginTop: "5px",
            backgroundColor: "rgb(37, 43, 50)",
            boxShadow: "0.5px 1.5px 2px 0.5px black",
        }}>
            <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center" sx={{
                ml: -2,
                color: "rgb(203, 207, 211)",
            }}>
                <Grid item xs={3}>
                    {experience_name}
                </Grid>
                <Grid item xs={4} sx={{ ml: 0 }}>
                    {experience_length}
                </Grid>
                <Grid item xs={3} sx={{ mr: 1 }}>
                    ${experience_price}
                </Grid>
                <Grid item xs={1}>
                    <div style={{ display: "flex" }}>
                        <Button
                            style={{ maxWidth: "32px", minWidth: "32px" }}
                            onClick={handleClickEdit}
                            variant="contained"
                            size="small">
                            <EditIcon />
                        </Button>
                        <Button
                            style={{ marginLeft: "2px", maxWidth: "32px", minWidth: "32px" }}
                            onClick={() => { handleAdminDeleteExp(experience_id) }}
                            variant="contained"
                            size="small">
                            <DeleteIcon />
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}