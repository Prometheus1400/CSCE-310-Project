const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')
const { Pool } = require('pg');

dotenv.config({ path: '../.env' })
const PORT = process.env.PORT || 1111 // this needs to match proxy in front-end package.json
const DATABASE_URL = process.env.DATABASE_URL
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD

const app = express()
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.static(path.join(__dirname + "/public")))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// start database connection
const pool = new Pool({
    connectionString: DATABASE_URL,
    password: DATABASE_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
});
pool.connect()

// start listening
app.listen(PORT, () => console.log('Server on PORT: ' + PORT))


/*
gets all users from the users table

params:
    none
returns:
    array of dictionaries containing user information
*/
app.get('/users', (req, response) => {
    pool.query('SELECT * FROM USERS', (err, res) => {
        if (err) {
            response.json({ err: err })
            return
        }
        response.json({ rows: res.rows })
    })
})

/*
logs a user into the website

params:
    email: String
    password: String
returns:
    dictionary containing an error if it occured, if the user exists, the user ID if signin was successful, and if the user is an admin
*/
app.get('/login', (req, response) => {
    let email = req.query.email
    let password = req.query.password
    pool.query('SELECT USER_ID, IS_ADMIN FROM USERS WHERE USER_EMAIL = $1 AND USER_PASSWORD = $2', [email, password], (err, res) => {
        if (err) {
            response.json({ err: err })
            return
        }
        if (res.rows.length > 0) { // if user exists
            response.json({ exists: true, userID: res.rows[0].user_id, isAdmin: res.rows[0].is_admin }) // send isAdmin boolean
            return
        }
        response.json({ exists: false }) // user does not exist
    })
})

/*
creates a user account

params:
    email: String
    password: String
    phone: String
    fname: String
    lname: String
    isTherapist: bool
returns:
    status of 200 if successful, else returns error
*/
app.post('/createAccount', (req, response) => {
    let email = req.body.email
    let password = req.body.password
    let phone = req.body.phone
    let fname = req.body.fname
    let lname = req.body.lname
    let isTherapist = req.body.isTherapist
    pool.query('INSERT INTO USERS(USER_FIRST_NAME, USER_LAST_NAME, USER_EMAIL, USER_PHONE, USER_PASSWORD, IS_ADMIN, IS_THERAPIST) VALUES ($1, $2, $3, $4, $5, false, $6)', [fname, lname, email, phone, password, isTherapist], (err, res) => {
        if (err) {
            response.json({ err: err })
            console.log(err)
            return
        }
        response.sendStatus(200)
    })
})

/*
gets all appointments with their assigned therapist

params:
    none
returns:
    array of dictionaries containing all appointments including id, experience, therapist, and times
*/
app.get('/get-appointments', (req, response) => {
    let query = `SELECT 
                    APPOINTMENT_ID,
                    EXPERIENCE_ID,
                    EXPERIENCE_NAME,
                    USER_ID AS THERAPIST_ID,
                    USER_FIRST_NAME AS THERAPIST_FIRST_NAME,
                    USER_LAST_NAME AS THERAPIST_LAST_NAME,
                    APPOINTMENT_START_TIME,
                    APPOINTMENT_END_TIME
                FROM APPOINTMENT_INFO_VIEW
                WHERE IS_THERAPIST = TRUE
                ORDER BY APPOINTMENT_START_TIME`
    pool.query(query, (err, res) => {
        if (err) {
            response.json({ err: err })
            return
        }
        response.json({ rows: res.rows })
    })
})

/*
gets all experiences from the experiences table

params:
    none
returns:
    array of dictionaries containing all experience names and IDs
*/
app.get('/get-experiences', (req, response) => {
    let query = `SELECT EXPERIENCE_NAME, EXPERIENCE_ID FROM EXPERIENCES`
    pool.query(query, (err, res) => {
        if (err) {
            response.json({ err: err })
            return
        }
        response.json({ experiences: res.rows })
    })
})

/*
submits a review to the reviews table

params:
    none
returns:
    array of dictionaries containing user information
*/
app.post('/write-review', (req, response) => {
    let rating = req.body.rating
    let review = req.body.review
    let experience = req.body.expID
    let user = req.body.userID
    let query = `INSERT INTO REVIEWS(USER_ID, EXPERIENCE_ID, REVIEW_DATE, REVIEW, RATING)
        VALUES($1, $2, NOW()::DATE, $3, $4);`
    pool.query(query, [user, experience, review, rating], (err, res) => {
        if (err) {
            response.json({ err: err })
            console.log(err)
            return
        }
        response.sendStatus(200)
    })
})

/*
gets all appointments for a specific user

params:
    userID: int
returns:
    array of dictionaries containing users appointments, including therapist, time, experience
*/
app.get('/get-user-appointments', (req, response) => {
    let user = req.query.userID
    let query = `WITH THERAPISTS AS (
                    SELECT 
                        USERS.USER_ID AS THERAPIST_ID, 
                        USERS.USER_FIRST_NAME AS THERAPIST_FIRST_NAME,
                        USERS.USER_LAST_NAME AS THERAPIST_LAST_NAME,
                        APPOINTMENT_ID
                    FROM user_appointments
                    JOIN USERS
                    ON USERS.USER_ID = USER_APPOINTMENTS.USER_ID
                    WHERE IS_THERAPIST = TRUE
                )
                SELECT
                    APPOINTMENT_INFO_VIEW.APPOINTMENT_ID,
                    EXPERIENCE_ID,
                    EXPERIENCE_NAME,
                    THERAPISTS.THERAPIST_ID,
                    THERAPISTS.THERAPIST_FIRST_NAME,
                    THERAPISTS.THERAPIST_LAST_NAME,
                    APPOINTMENT_START_TIME,
                    APPOINTMENT_END_TIME
                FROM APPOINTMENT_INFO_VIEW
                JOIN THERAPISTS
                ON APPOINTMENT_INFO_VIEW.APPOINTMENT_ID = THERAPISTS.APPOINTMENT_ID
                WHERE USER_ID = $1`
    pool.query(query, [user], (err, res) => {
        if (err) {
            response.json({ err: err })
            console.log(err)
            return
        }
        response.json({ appointments: res.rows })
    })
})

/*
adds a user to an appointment

params:
    aptID: int
    userID: int
returns:
    array of dictionaries containing user information
*/
app.post('/user-book', (req, response) => {
    let aptID = req.body.aptID
    let userID = req.body.userID
    let query = `INSERT INTO USER_APPOINTMENTS(USER_ID, APPOINTMENT_ID) VALUES($1, $2)`
    pool.query(query, [userID, aptID], (err, res) => {
        if (err) {
            response.json({ err: err })
            console.log(err)
            return
        }
        response.sendStatus(200)
    })
})

/*
gets all reviews for an experience

params:
    expID: int
returns:
    array of dictionaries containing ratings for specific experience
*/
app.get('/get-reviews', (req, response) => {
    let expID = req.query.expID
    let query = `SELECT * FROM REVIEWS WHERE EXPERIENCE_ID = $1;`
    pool.query(query, [expID], (err, res) => {
        if (err) {
            response.json({ err: err })
            return
        }
        response.json({ reviews: res.rows })
    })
})

/*
removes user from an appointment

params:
    aptID: int
    userID: int
returns:
    error or status code of 200 if successful
*/
app.post('/user-unbook', (req, response) => {
    let aptID = req.body.aptID
    let userID = req.body.userID
    let query = `DELETE FROM USER_APPOINTMENTS WHERE USER_ID = $1 AND APPOINTMENT_ID = $2`
    pool.query(query, [userID, aptID], (err, res) => {
        if (err) {
            response.json({ err: err })
            console.log(err)
            return
        }
        response.sendStatus(200)
    })
})

/*
creates an appointment

params:
    expID: int
    startTime: String
        format: 'yyyy-mm-dd hh:mm:ss'
    comments: String
    therapistID: int
returns:
    error or status code 200 if successful
*/
app.post('/create-appointment', (req, response) => {
    let expID = req.body.experienceID
    let startTime = req.body.startTime
    let comments = req.body.comments
    let therapistID = req.body.therapistID

    let query = `WITH CREATE_APT AS (
                    INSERT INTO APPOINTMENTS(EXPERIENCE_ID, APPOINTMENT_START_TIME, COMMENTS) VALUES ($1, $2::TIMESTAMP, $3) RETURNING APPOINTMENT_ID
                )
                INSERT INTO USER_APPOINTMENTS(APPOINTMENT_ID, USER_ID)
                SELECT APPOINTMENT_ID, $4 FROM CREATE_APT;`
    pool.query(query, [expID, startTime, comments, therapistID], (err, res) => {
        if (err) {
            response.json({ err: err })
            console.log(err)
            return
        }
        response.sendStatus(200)
    })
})

/*
updates an appointment

params:
    apptID: int
    expID: int
    startTime: String
        format: 'yyyy-mm-dd hh:mm:ss'
    comments: String
returns:
    error or status code 200 if successful
*/
app.post('/update-appointment', (req, response) => {
    let expID = req.body.experienceID
    let startTime = req.body.startTime
    let comments = req.body.comments
    let apptID = req.body.appointmentID

    let query = `UPDATE APPOINTMENTS 
                SET EXPERIENCE_ID = $1, APPOINTMENT_START_TIME = $2::TIMESTAMP, COMMENTS = $3 WHERE APPOINTMENT_ID = $4`
    pool.query(query, [expID, startTime, comments, apptID], (err, res) => {
        if (err) {
            response.json({ err: err })
            console.log(err)
            return
        }
        response.sendStatus(200)
    })
})

/*
deletes an appointment

params:
    apptID: int
returns:
    error or status code 200 if successful
*/
app.post('/delete-appointment', (req, response) => {
    let apptID = req.body.appointmentID

    let query = `DELETE FROM APPOINTMENTS WHERE APPOINTMENT_ID = $1`
    pool.query(query, [apptID], (err, res) => {
        if (err) {
            response.json({ err: err })
            console.log(err)
            return
        }
        response.sendStatus(200)
    })
})

/*
Profile (User/Admin)
    Register a user account
    Login into the user account
Update user account profile
Delete Profile

Schedule (User/Admin)
    Create an appointment
    View an appointment
Update an appointment
Delete an appointment

Item/Experience (User/Admin)
Add an item/experience
    View items /experiences
Update an item/experience
Delete an item /experience

Comment/Status/Review/etc. (User/Admin)
Add a Comment/Status/Review/Etc
    View Comment/Status/Review/Etc
Update a Comment/Status/Review/Etc
Delete a Comment/Status/Review/Etc

*/
