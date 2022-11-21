import AppointmentList from "../components/AppointmentList"
import { useEffect, useState } from "react"
import UserAppointmentList from "../components/UserAppointmentList"
import { AptFuncContext } from "../context/AptFuncContext"
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useCallback } from "react"

function AppointmentPage() {

    const [apts, setApts] = useState([])
    const [userApts, setUserApts] = useState([])
    const { user } = useContext(UserContext)


    const getAppointments = () => {
        axios.get("/get-appointments"
        ).then((resp) => {
            console.log("got appointments")
            console.log(resp.data.rows)
            setApts(resp.data.rows)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getUserAppointments = useCallback(() => {
        user.isAdmin && axios.get("/get-user-appointments", {
            params: {
                userID: user.userID,
            }
        }).then((resp) => {
            console.log("got user appointments")
            console.log(resp.data.rows)
            setUserApts(resp.data.rows)
        }).catch((err) => {
            console.log(err)
        })
    }, [user])

    // query to get appointment list and users appointments
    useEffect(() => {
        console.log("appointmentPage useEffect()")
        getAppointments()
        getUserAppointments()
        // user.isAdmin = true
    }, [getUserAppointments, user])

    /* TODO:
     * Make requests send post request to update the database, and then 
     * re-quiery the userApts
     */
    const handleUserBook = (aptID, userID) => {
        console.log("Booked", aptID, userID)
    }

    const handleUserRemove = (aptID, userID) => {
        console.log("removed", aptID, userID)
    }

    const handleAdminDelete = (aptID) => {
        console.log("handleAdminDelete()", aptID)
    }

    const handleAdminAdd = (aptInfo) => {
        console.log("handleAdminDelete()", aptInfo)
    }

    const handles = {
        handleUserBook,
        handleUserRemove,
        handleAdminDelete,
        handleAdminAdd,
    }

    return (
        <div className="AppointmentPage" style={{
            display: "flex", 
            alignItems: "center",
            justifyContent: "center"
        }}>
            <AptFuncContext.Provider value={handles}>
                <AppointmentList apts={apts} />
                {!user.isAdmin && 
                    <UserAppointmentList userApts={userApts} />
                }
            </AptFuncContext.Provider>
        </div>
    )
}

export default AppointmentPage