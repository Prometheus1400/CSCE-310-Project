import { useState, useContext } from "react"
import Experience from "./Experience"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl } from "@mui/material"
import { InputAdornment } from "@mui/material"
import { AptFuncContext } from "../context/AptFuncContext"

export default function ExperienceList(props) {
    const {experiences} = props
    const {handleAdminAddExp, handleAdminUpdateExp} = useContext(AptFuncContext)
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({
        experience_name: "",
        experience_length: "",
        experience_price: "",
        experience_description: "",
    })

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setEditMode(false)
        setOpen(false)
        setFormData({
            experience_name: "",
            experience_length: "",
            experience_price: "",
            experience_description: "",
        })
    }

    const handleSubmit = () => {
        console.log(formData)
        if (editMode) {
            handleAdminUpdateExp(formData)
        } else {
            handleAdminAddExp(formData)
        }

        handleClose()
    }

    const handleFormChange = (event) => {
        setFormData(prev => {
            return (
                {
                    ...prev,
                    [event.target.name]: event.target.value,
                }
            )
        })
    }

    let count = 0
    const expComponents = experiences.map(exp => {
        return (
            <Experience
                key={count++}
                item={exp}
                setOpen={setOpen}
                setFormData={setFormData}
                setEditMode={setEditMode}
            />
        )
    })

    return (
        <div className="ExperienceList" style={{
            height: "450px",
            backgroundColor: "rgb(26, 32, 39)",
            padding: "10px",
            width: "auto",
            margin: "10px",
            color: "rgb(243, 246, 249)",
            textAlign: "center",
            borderRadius: "10px 10px 10px 10px",
        }}>
            <h3>Edit Experiences &zwnj; &zwnj;
                <Button onClick={handleOpen} variant="contained" size="small"> add </Button>
            </h3>

            {expComponents}
            <Dialog open={open} onClose={handleClose} style={{ width: "100%" }}>
                <DialogTitle>Add experience details here.</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <TextField
                            name="experience_name"
                            value={formData.experience_name}
                            label="Experience Name"
                            onChange={handleFormChange}
                            sx={{ minWidth: 246 }}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <TextField
                            name="experience_length"
                            value={formData.experience_length}
                            label="Experience Length"
                            onChange={handleFormChange}
                            sx={{ minWidth: 246 }}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <TextField
                            name="experience_price"
                            value={formData.experience_price}
                            label="Experience Price"
                            onChange={handleFormChange}
                            sx={{ minWidth: 246 }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "90%", }}>
                        <TextField
                            name="experience_description"
                            value={formData.experience_description}
                            label="Experience Description"
                            onChange={handleFormChange}
                            sx={{ width: "100%" }}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Done</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}