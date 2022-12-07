import Appointment from "./Appointment"

export default function UserAppointmentList(props) {
    const {userApts} = props
    /* const userApts = [
        {
            "experienceID": "1",
            "experienceName": "group session",
            "startTime": "",
            "duration": "",
            "therapistID": "1",
            "therapistName": "Roger Smith",
        },
        {
            "experienceID": "1",
            "experienceName": "group session",
            "startTime": "",
            "duration": "",
            "therapistID": "1",
            "therapistName": "Stan Smith",
        },
        {
            "experienceID": "1",
            "experienceName": "group session",
            "startTime": "",
            "duration": "",
            "therapistID": "1",
            "therapistName": "Stan Smith",
        },
        {
            "experienceID": "1",
            "experienceName": "group session",
            "startTime": "",
            "duration": "",
            "therapistID": "1",
            "therapistName": "Stan Smith",
        },
    ] */

    let count = 0
    const userAptsComps = userApts.map((a) => {
        count++
        return (
            <Appointment 
                item={a}
                key={count}
                canBook={false}
                canRemove={true}
            />
        )
    })

    return (
        <div className="UserAppointmentList" style={{
            backgroundColor: "rgb(26, 32, 39)",
            width: "auto",
            margin: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "10px",
            height:"450px",
            color:"rgb(243, 246, 249)",
            textAlign: "center",
            borderRadius:"10px 10px 10px 10px",
            position:"sticky",
            left:"400px",
        }}>
            <h3>My Appointments</h3>
            {userAptsComps}
            {userAptsComps.length === 0 && 
                <div style={{width:"350px"}}>No appointments booked</div>
            }

        </div>
    )

}