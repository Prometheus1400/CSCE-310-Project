const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const path = require('path')
const { Pool } = require('pg');
const { response } = require('express');

dotenv.config({path: '../.env'})
const PORT = process.env.PORT || 1111 // this needs to match proxy in front-end package.json
const DATABASE_URL = process.env.DATABASE_URL
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname + "/public")))

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

app.get('/persons', (req, response) => {
    pool.query('SELECT * FROM PERSONS', (err, res) => {
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
    pool.query('SELECT IsAdmin FROM PERSONS WHERE UserEmail = $1 AND Password = $2', [email, password], (err, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        if(res.rows.length > 0) { // if user exists
            response.json({exists: true, isAdmin: res.rows[0]}) // send isAdmin boolean
            return
        }
        response.json({exists: false}) // user does not exist
    })
})

app.get('/createAccount', (req, response) => {
    let email = req.query.email
    let password = req.query.password
    let phone = req.query.phone
    let name = req.query.name
    pool.query('INSERT INTO PERSONS(UserName, UserEmail, UserPhone, UserPassword, IsAdmin) VALUES ($1, $2, $3, $4, false)', [name, email, phone, password], (req, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        response.json({err: false})
    })
})