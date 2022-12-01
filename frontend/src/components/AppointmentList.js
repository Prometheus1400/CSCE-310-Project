import Appointment from "./Appointment"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { AptFuncContext } from "../context/AptFuncContext";
import { Button, TextField, Dialog, DialogActions, DialogContent, InputLabel, DialogTitle, Select, MenuItem, FormControl } from "@mui/material"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function AppointmentList(props) {
    // TODO: implement context to get isAdmin state
    const { apts } = props
    const { user } = useContext(UserContext)
    const { handleAdminAdd } = useContext(AptFuncContext)
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        experienceID: "",
        therapistID: "",
        startTime: "",
        duration: "", // in hours
        comments: "",
    })
    const durations = [0.5, 1, 2, 3]


    const experiences = [
        {
            experienceID: 1,
            experienceName: "group session"
        },
        {
            experienceID: 2,
            experienceName: "individual session"
        },
    ]

    const therapists = [
        {
            therapistID: 1,
            therapistName: "tyler woods"
        },
        {
            therapistID: 2,
            therapistName: "dick chaineey"
        },
    ]

    const handleFormChange = (event) => {
        setFormData((prev) => {
            return ({
                ...prev,
                [event.target.name]: event.target.value
            })
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        // send post request
        handleAdminAdd(formData)
        setFormData({
            experienceID: '',
            therapistID: "",
            startTime: "",
            duration: "",
            comments: "",
        })
        handleClose()
    }

    let count = 0
    const aptComponents = apts.map((a) => {
        count++
        return (
            <Appointment
                item={a}
                key={count}
                canBook={true}
                canRemove={false}
            />
        )
    })

    const experienceOptions = experiences.map((exp) => {
        count++
        return (
            <MenuItem
                value={exp.experienceID}
                key={count}
            >
                {exp.experienceName}
            </MenuItem>
        )
    })

    const durationOptions = durations.map((dur) => {
        count++
        const displayStr = dur === 0.5 ? "30 minutes" : dur + " hours"

        return (
            <MenuItem
                value={dur}
                key={count}
            >
                {displayStr}
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

    return (
        <div className="AppointmentList" style={{
            height: "450px",
            backgroundColor: "rgb(26, 32, 39)",
            padding: "10px",
            width: "auto",
            margin: "10px",
            color: "rgb(171, 174, 178)",
            textAlign: "center",
            borderRadius: "10px 10px 10px 10px",
            position: user.isAdmin ? "static" : "absolute",
            left: "0px",

        }}>
            <h3>Available Appointments &zwnj; &zwnj;
                {user.isAdmin &&
                    <Button onClick={handleClickOpen} variant="contained" size="small"> add </Button>
                }
            </h3>

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
                        <InputLabel id="duration">Duration</InputLabel>
                        <Select
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            label="Duration"
                            onChange={handleFormChange}
                            sx={{ minWidth: 246 }}
                            defaultValue=""
                        >
                            {/* <MenuItem value="">
                                <em>None</em>
                            </MenuItem> */}
                            {durationOptions}
                        </Select>
                    </FormControl>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>

            <div className="scrollable" style={{ height: "100%", overflowY: "auto" }}>
                {aptComponents}
            </div>
        </div >
    )

}

export default AppointmentList