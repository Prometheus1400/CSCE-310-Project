import Appointment from "./Appointment"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { AptFuncContext } from "../context/AptFuncContext";
import { Button, TextField, Dialog, DialogActions, DialogContent, InputLabel, DialogTitle, Select, MenuItem, FormControl } from "@mui/material"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";


function AppointmentList(props) {
    // TODO: implement context to get isAdmin state
    const { apts, experiences } = props
    const { user } = useContext(UserContext)
    const { handleAdminAdd, handleAdminUpdate } = useContext(AptFuncContext)
    const [therapists, setTherapists] = useState([])
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({
        experienceID: "",
        therapistID: "",
        startTime: "",
        duration: "", // in hours
        comments: "",
    })

    const getTherapists = async () => {
        axios.get("/get-therapists")
            .then(resp => {
                console.log("getTherapists:")
                console.log(resp)
                console.log(resp.data.therapists)
                setTherapists(resp.data.therapists)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getTherapists()
    }, [])

    const handleFormChange = (event) => {
        setFormData((prev) => {
            return ({
                ...prev,
                [event.target.name]: event.target.value
            })
        })
    }

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
        setEditMode(false)
        setFormData({
            experienceID: '',
            therapistID: "",
            startTime: "",
            duration: "",
            comments: "",
        })
    };

    const handleSubmit = () => {
        // send post request
        if (!editMode) {
            handleAdminAdd(formData)
        } else {
            delete formData.comments
            handleAdminUpdate(formData)
        }
        handleClose()
    }

    let count = 0
    const experienceOptions = experiences.map((exp) => {
        count++
        return (
            <MenuItem
                value={exp.experience_id}
                key={count}
            >
                {exp.experience_name}
            </MenuItem>
        )
    })

    const therapistOptions = therapists.map((thpst) => {
        count++
        return (
            <MenuItem
                value={thpst.therapistID}
                key={count}
            >
                {thpst.therapistName}
            </MenuItem>
        )
    })

    const aptComponents = apts.map((a) => {
        count++
        return (
            <Appointment
                item={a}
                key={count}
                canBook={true}
                canRemove={false}
                setFormData={setFormData}
                setOpen={setOpen}
                setEditMode={setEditMode}
            />
        )
    })

    return (
        <div className="AppointmentList" style={{
            height: "450px",
            backgroundColor: "rgb(26, 32, 39)",
            padding: "10px",
            width: "auto",
            margin: "10px",
            color: "rgb(243, 246, 249)",
            textAlign: "center",
            borderRadius: "10px 10px 10px 10px",
            position: user.isAdmin ? "static" : "absolute",
            left: "0px",

        }}>
            {user.isAdmin &&
                <h3>Edit Appointments &zwnj; &zwnj;
                    <Button onClick={handleClickOpen} variant="contained" size="small"> add </Button>
                </h3>
            }
            {!user.isAdmin &&
                <h3>Available Appointments</h3>
            }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add appointment details here.</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="experience">Experience</InputLabel>
                        <Select
                            id="experience"
                            name="experienceID"
                            value={formData.experienceID}
                            label="Experience"
                            onChange={handleFormChange}
                            sx={{ minWidth: 246 }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {experienceOptions}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="therapist">Therapist</InputLabel>
                        <Select
                            id="therapist"
                            name="therapistID"
                            value={formData.therapistID}
                            label="Experience"
                            onChange={handleFormChange}
                            sx={{ minWidth: 246 }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {therapistOptions}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Choose a start time"
                                value={formData.startTime || null}
                                onChange={(newTime) => setFormData((prev) => {
                                    return ({
                                        ...prev,
                                        startTime: newTime
                                    })
                                })}
                                renderInput={(params) => <TextField {...params} />}
                                id="startTime"
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} >
                    </FormControl>
                    {!editMode &&
                        <TextField
                            autoFocus
                            margin="dense"
                            id="comments"
                            name="comments"
                            label="Comments"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.comments}
                            onChange={handleFormChange}
                            autoComplete="off"
                        />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Done</Button>
                </DialogActions>
            </Dialog>

            <div className="scrollable" style={{ height: "100%", overflowY: "auto" }}>
                {aptComponents}
            </div>
        </div >
    )

}

export default AppointmentList