const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')
const { Pool } = require('pg');

dotenv.config({path: '../.env'})
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

app.get('/users', (req, response) => {
    pool.query('SELECT * FROM USERS', (err, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        response.json({rows: res.rows})
    })
})

app.get('/login', (req, response) => {
    let email = req.query.email
    let password = req.query.password
    pool.query('SELECT USER_ID, IS_ADMIN FROM USERS WHERE USER_EMAIL = $1 AND USER_PASSWORD = $2', [email, password], (err, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        if(res.rows.length > 0) { // if user exists
            response.json({exists: true, userID: res.rows[0].user_id, isAdmin: res.rows[0].is_admin}) // send isAdmin boolean
            return
        }
        response.json({exists: false}) // user does not exist
    })
})

app.post('/createAccount', (req, response) => {
    let email = req.body.email
    let password = req.body.password
    let phone = req.body.phone
    let fname = req.body.fname
    let lname = req.body.lname
    let isTherapist = req.body.isTherapist
    pool.query('INSERT INTO USERS(USER_FIRST_NAME, USER_LAST_NAME, USER_EMAIL, USER_PHONE, USER_PASSWORD, IS_ADMIN, IS_THERAPIST) VALUES ($1, $2, $3, $4, $5, false, $6)', [fname, lname, email, phone, password, isTherapist], (err, res) => {
        if(err) {
            response.json({err: err})
            console.log(err)
            return
        }
        response.sendStatus(200)
    })
})

app.get('/get-appointments', (req, response) => {
    let query = `SELECT 
                    APPOINTMENT_ID,
                    EXPERIENCE_ID,
                    EXPERIENCE_NAME,
                    USER_ID AS THERAPIST_ID,
                    USER_FIRST_NAME AS THERAPIST_FIRST_NAME,
                    USER_LAST_NAME AS THERAPIST_LAST_NAME
                FROM APPOINTMENT_INFO_VIEW
                WHERE IS_THERAPIST = TRUE`
    pool.query(query, (err, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        response.json({rows: res.rows})
    })
})