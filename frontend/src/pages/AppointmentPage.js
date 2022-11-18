import AppointmentList from "../components/AppointmentList"
import { useEffect, useState } from "react"
import UserAppointmentList from "../components/UserAppointmentList"
import { AptFuncContext } from "../context/AptFuncContext"

function AppointmentPage() {

    const [apts, setApts] = useState([])
    const [userApts, setUserApts] = useState([])

    // query to get appointment list and users appointments
    // useEffect(() => {

    // }, [])

    /* TODO:
     * Make both requests send post request to update the database, and then 
     * re-quiery the userApts
     */
    const handleBook = (aptID, userID) => {
        console.log("Booked", aptID, userID)
    }

    const handleRemove = (aptID, userID) => {
        console.log("removed", aptID, userID)
    }

    const handles = {
        handleBook,
        handleRemove
    }

    return (
        <div className="AppointmentPage" style={{ display: "flex" }}>
            <AptFuncContext.Provider value={handles}>
                <AppointmentList apts={apts} />
                <UserAppointmentList userApts={userApts} />
            </AptFuncContext.Provider>
        </div>
    )
}

export default AppointmentPage