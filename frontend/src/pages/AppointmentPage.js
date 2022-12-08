import AppointmentList from "../components/AppointmentList"
import { useEffect, useState } from "react"
import UserAppointmentList from "../components/UserAppointmentList"
import { AptFuncContext } from "../context/AptFuncContext"
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useCallback } from "react"
import ExperienceList from "../components/ExperienceList"

function AppointmentPage() {

    const [apts, setApts] = useState([])
    const [userApts, setUserApts] = useState([])
    const [experiences, setExperiences] = useState([])
    const { user } = useContext(UserContext)


    const getAppointments = async () => {
        axios.get("/get-appointments"
        ).then((resp) => {
            console.log("got appointments")
            console.log(resp.data.rows)
            setApts(resp.data.rows)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getUserAppointments = useCallback(async () => {
        !user.isAdmin && axios.get("/get-user-appointments", {
            params: {
                userID: user.userID,
            }
        }).then((resp) => {
            console.log("got user appointments", user.userID)
            console.log(resp.data)
            setUserApts(resp.data.appointments)
        }).catch((err) => {
            console.log(err)
        })
    }, [user])

    const getExperiences = async () => {
        axios.get("/get-experiences")
            .then(resp => {
                console.log("getExeriences:")
                console.log(resp.data.experiences)
                setExperiences(resp.data.experiences)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // query to get appointment list and users appointments
    useEffect(() => {
        if (!user || user.userID === '') return

        console.log("appointmentPage useEffect()", user)
        getAppointments()
        getExperiences()
        getUserAppointments()
        // user.isAdmin = true
    }, [getUserAppointments, user])


    const handleUserBook = (aptID, userID) => {
        console.log("handleUserBook()", aptID, userID)
        axios.post("/user-book", {
            aptID: aptID,
            userID: userID,
        })
            .then(resp => {
                console.log("handleUserBook:", resp)
                // re-quiery user's appointments
                getUserAppointments()
            })
            .catch(err => console.log(err))
    }

    const handleUserUnbook = (aptID, userID) => {
        console.log("handleUserUnbook()", aptID, userID)
        axios.post("/user-unbook", {
            aptID: aptID,
            userID: userID,
        })
            .then(resp => {
                console.log("handleUserUnbook:", resp)
                // re-quiery user's appointments
                getUserAppointments()
            })
            .catch(err => console.log(err))
    }


    const handleAdminAdd = (aptInfo) => {
        console.log("handleAdminAdd()", aptInfo)
        axios.post("/create-appointment", aptInfo)
            .then(resp => {
                console.log(resp)
                getAppointments()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleAdminUpdate = (aptInfo) => {
        console.log("handleAdminUpdate", aptInfo)
        //TODO: send post request, update appointments
        axios.post("/update-appointment", aptInfo)
            .then(resp => {
                console.log(resp)
                getAppointments()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleAdminDelete = (aptID) => {
        console.log("handleAdminDelete()", aptID)
        //TODO: send post request, update appointments
        axios.post("/delete-appointment", {
            appointmentID: aptID,
        })
            .then(resp => {
                console.log(resp)
                getAppointments()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleAdminAddExp = (exp) => {
        console.log("handleAdminAddExp()", exp)
        axios.post("/create-experience", exp)
            .then(resp => {
                console.log(resp)
                getExperiences()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleAdminUpdateExp = (exp) => {
        console.log("handleAdminUpdateExp()", exp)
        axios.post("/update-experience", exp)
            .then(resp => {
                console.log(resp)
                getExperiences()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleAdminDeleteExp = (experience_id) => {
        console.log("handleAdminDeleteExp()", experience_id)
        axios.post("/delete-experience", {
            experience_id: experience_id,
        })
            .then(resp => {
                console.log(resp)
                getExperiences()
                // requery appointments in case removing some experiences
                // also removed some appointments
                getAppointments()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handles = {
        handleUserBook,
        handleUserUnbook,
        handleAdminDelete,
        handleAdminAdd,
        handleAdminUpdate,
        handleAdminAddExp,
        handleAdminUpdateExp,
        handleAdminDeleteExp,
    }

    return (
        <div className="AppointmentPage" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <AptFuncContext.Provider value={handles}>
                <AppointmentList apts={apts} experiences={experiences} />
                {!user.isAdmin &&
                    <UserAppointmentList userApts={userApts} />
                }
                {/*user.isAdmin*/ true &&
                    <ExperienceList experiences={experiences} />
                }
            </AptFuncContext.Provider>
        </div>
    )
}

export default AppointmentPage