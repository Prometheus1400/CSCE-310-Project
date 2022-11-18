import Appointment from "./Appointment"

export default function UserAppointmentList(props) {
    const userApts = [
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
    ]

    const userAptsComps = userApts.map((a) => {
        return (
            <Appointment 
                item={a}
                canBook={false}
                canRemove={true}
            />
        )
    })

    return (
        <div className="UserAppointmentList" style={{
            backgroundColor: "gray",
            width: "500px",
            margin: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "10px",
            textAlign: "center",
        }}>
            <h3>My Appointments</h3>
            {userAptsComps}

        </div>
    )

}