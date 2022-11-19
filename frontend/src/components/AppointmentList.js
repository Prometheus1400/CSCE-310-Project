import Appointment from "./Appointment"

function AppointmentList(props) {
    // TODO: implement context to get isAdmin state
    const {apts} = props
    let count = 0

    // get from props
/*     const apts = [
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
        {
            "experienceID": "1",
            "experienceName": "group session",
            "startTime": "",
            "duration": "",
            "therapistID": "1",
            "therapistName": "Stan Smith",
        },
    ]
 */
    
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

    return (
        <div className="AppointmentList" style={{
            height:"450px",
            backgroundColor: "gray",
            padding:"10px",
            width: "300px",
            margin:"10px"

        }}>
            <h3>Available Appointments</h3>
            <div className="scrollable" style={{ height: "100%", overflowY: "auto" }}>
                {aptComponents}
            </div>
        </div>
    )

}

export default AppointmentList