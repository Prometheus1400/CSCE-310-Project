import AppointmentList from "../components/AppointmentList"
import { useEffect, useState } from "react"
import UserAppointmentList from "../components/UserAppointmentList"
import { AptFuncContext } from "../context/AptFuncContext"
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

function AppointmentPage() {

    const [apts, setApts] = useState([])
    const [userApts, setUserApts] = useState([])
    const {user} = useContext(UserContext)

    // query to get appointment list and users appointments
    useEffect(() => {
        console.log("user", user)

        axios.get("/get-appointments"
        ).then((resp) => {
            console.log("got appointments")
            console.log(resp.data.rows)
            setApts(resp.data.rows)
        }).catch((err) => {
            console.log(err)
        })

        axios.get("/get-user-appointments", {
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

    }, [user, user.userID])

    /* TODO:
     * Make both requests send post request to update the database, and then 
     * re-quiery the userApts
     */
    const handleUserBook = (aptID, userID) => {
        console.log("Booked", aptID, userID)
    }

    const handleUserRemove = (aptID, userID) => {
        console.log("removed", aptID, userID)
    }

    const handles = {
        handleUserBook,
        handleUserRemove
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