const mysql = require('mysql');
const express = require('express')
const app = express()
const port = 3000

var conn = mysql.createConnection({

  host:"cloud-computing.cxhv5ibnbx8w.us-east-1.rds.amazonaws.com",
  user:"admin",
  password:"password123!",
  port: "3306",
  database: "Cloud-Computing"
});

conn.connect( (err) => {
  var display = ""
  if(err){
    console.error("DB connection failed " + err.stack);
    display="error";
    return;
  }
  console.log("connection successful");
  display="success";
})


app.get('/', (req, res) => {
  var display = "";
  var query = "Select * from users"
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      display=error.stack;
    }
    console.log(results);
    display=results
  })

  res.send(display);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})