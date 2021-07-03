
 const mysql = require("mysql2")
 const connection = require("./configuracoes.json")
 

 const dbconnection = mysql.createPool({
     connectionLimit: connection.banco.connectionLimit,
     host: connection.banco.host,
     user: connection.banco.usuario,
     password: connection.banco.senha,
     database: connection.banco.databaseDesafio,
     timezone: connection.banco.timezone,
     dateStrings: connection.banco.dateStrings,
 })
 
 
 module.exports = {dbconnection}