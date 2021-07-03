
const express = require("express")
const cors = require('cors')
const connection = require("./configuracoes.json")
const port = connection.bk.porta

const mysql = require("mysql2");

const app = express()
const router = require("./router")



app.use(cors())
app.options('*', cors())

app.use(express.json({
    limit: "20mb"
}))

app.use(express.urlencoded({
    limit: "20mb",
    extended: true
}))

app.listen(port, () => {
    console.log("running server");
}) 

app.use(router);