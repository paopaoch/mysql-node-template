const express = require('express')
const cors = require('cors')
const app = express()
const util = require('./services/util.js')

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3000'],
    methods: 'GET,PUT'
}))
app.use(express.json())
app.listen(2000)

const mysql = require('mysql')
const mysqlConfig = require('./config/mysql')
const connection = mysql.createConnection(mysqlConfig.config)

app.get('/test-api-1', (req, res) => { //end point
    const name = req.query.name
    res.send("Helloooooooo "+name)
})

app.get('/test-api-2', (req, res) => {
    const data = [11, 22, 33, 44, 55]
    const json = {
        data: data,
        status: 'OK'
    }
    res.json(json)
})

app.get('/user-list', (req, res) => {
	const sql = "SELECT * FROM users"
	let rs = []
	//console.log(sql)
    try {
        connection.query(sql, (err, result, fields) => {
            if (err) throw err       
            res.send(result)
        })
    }
    catch(err) {
        console.error('error at /user-list =>', err)
    }
})

app.post('/login', (req, res) => {
    const params = [
        req.body.email
    ]
    let sql = "SELECT * FROM users WHERE email =?"
    sql = mysql.format(sql, params)
    try {
        connection.query(sql, (err, result, fields) => {
            if (err) throw err       
            res.send(result)
        })
    }
    catch(err) {
        console.error('error at /user-list =>', err)
    }
})

app.post('/get-profile', (req, res) => {
    const params = [
        req.body.id
    ]
    let sql = "SELECT * FROM users WHERE id =?"
    sql = mysql.format(sql, params)
    try {
        connection.query(sql, (err, result, fields) => {
            if (err) throw err       
            res.send(result)
        })
    }
    catch(err) {
        console.error('error at /get-profile =>', err)
    }
})

app.post('/upload-profile-image', (req, res) => {
    console.log('reqq ==>',req)
})

app.post('/create-user', (req, res) => {
    const params = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.password
    ]
    let sql = "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?);"
    sql = mysql.format(sql, params)
    try {
        connection.query(sql, (err, result, fields) =>{
            if (err) throw err
            res.send(result)
        })
    }
    catch(err) {
        console.error('error at /create-user =>', err)
    }
})

app.post('/delete-user', (req, res) => {
    const params = [
        req.body.id
    ]
    let sql = "DELETE FROM users WHERE id=?"
    sql = mysql.format(sql, params)
    try {
        connection.query(sql, (err, result, field) =>{
            if (err) throw err
            res.send(result)
        })
    }
    catch(err) {
        console.error('error at /delete-user =>', err)
    }
})

app.post('/update-user', (req, res) => {
    const params = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.password,
        req.body.id
    ]
    let sql = "UPDATE users SET firstname=?, lastname=?, email=?, password=? WHERE id=?"
    sql = mysql.format(sql, params)
    try {
        connection.query(sql, (err, result, fields) =>{
            if (err) throw err
            res.send(result)
        })
    }
    catch(err) {
        console.error('error at /update-user =>', err)
    }
})

app.get('/get-all-provice', (req, res) => {
    const sql = "SELECT * FROM province_master"
    try {
        connection.query(sql, (err, result, fields) => {
            if(err) throw err
            res.send(result)
        })
    }
    catch(err) {
        console.error('error at /get-all-province =>', err)
    }
})