require('dotenv').config()

const express = require('express')
const mysql = require('mysql')

const app = express()

const PORT = process.env.PORT

// Serve static HTML, CSS & JS files from "client" directory.
app.use(express.static('client'))
// Parse incoming request bodies with JSON payloads.
app.use(express.json()) 

// Create a MySql connection to the "shorturls" database.
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
})

pool.getConnection((error, connection) => {
    if (error) {
        console.error(`Database connection failed: ${error.message}`)
    } else {
        console.log('Connected to database.')
        connection.release()
    }
})

// Routes ------------------------------------------------------------------- //

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html') // Serve index.html from the "client" directory.
})

app.post('/api/create-short-url', function(req, res) {
    let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substring(2, 10)
    let sql = `INSERT INTO links(longurl, shorturlid) VALUES('${req.body.longurl}', '${uniqueID}')`
    
    pool.query(sql, function(error, result) {
        if(error) {
            res.status(500).json({
                status: 'Not OK',
                message: 'Something went wrong'
            })
        } else {
            res.status(200).json({
                status: 'OK',
                shorturlid: uniqueID
            })
        }
    })
})

app.get('/api/get-all-short-urls', function(req, res) {
    let sql = `SELECT * FROM links`

    pool.query(sql, function(error, result) {
        if(error) {
            res.status(500).json({
                status: 'Not OK',
                message: 'Something went wrong'
            })
        } else {
            res.status(200).json(result)
        }
    })
})

app.get('/:shorturlid', function(req, res) {
    let shorturlid = req.params.shorturlid
    let sql = `SELECT * FROM links WHERE shorturlid='${shorturlid}' LIMIT 1`

    pool.query(sql, function(error, result) {
        if(error) {
            res.status(500).json({
                status: 'Not ok',
                message: 'Something went wrong'
            })
        } else {
            sql = `UPDATE links SET count=${result[0].count + 1} WHERE id='${result[0].id}' LIMIT 1`
            pool.query(sql, function(error, result2) {
                if(error) {
                    res.status(500).json({
                        status: 'Not ok',
                        message: 'Something went wrong'
                    })
                } else {
                    res.redirect(result[0].longurl)
                }
            })
        }
    })
})

const server = app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})

server.on('error', (error) => {
    console.error(`Server listen error: ${error}`)
})