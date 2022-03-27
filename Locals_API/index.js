const mysql = require('mysql');
const express = require('express')
const app = express()
const port = 3004

app.use(express.json());

const axios = require('axios').default;

// const AWS = require('aws-sdk');
// var credentials = new AWS.SharedIniFileCredentials();
// AWS.config.credentials = credentials;
// const client = new AWS.DynamoDB.DocumentClient();

var conn = mysql.createConnection({

  host:"cloud-computing.cxhv5ibnbx8w.us-east-1.rds.amazonaws.com",
  user:"admin",
  password:"password123!",
  port: "3306",
  database: "Cloud-Computing"
});

conn.connect( (err) => {
  if(err){
    console.error("DB connection failed " + err.stack);
    return;
  }
  console.log("connection successful");
})

app.get('/', (req, res) => {
  res.send(`Successfully listening on ${port}`);
})



/*USERS*/




app.get('/users', (req, res) => {
  var query = "Select * from users"
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results);
  })
})

app.get('/users/:userid', (req, res) => {
  var query = `Select * from users where userid = ${req.params.userid}`
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results);
  })
})

app.patch('/users/:userid/credit', (req, res) => {
  //newcredit can be - or +. 
  var credits = req.body.currentcredits + req.body.newcredits; 
  var query = `Update users SET credits  = ${credits} where userid = ${req.params.userid}`
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results);
  })
})

app.post('/users/', (req, res) => {
  var query = `insert into users (firstname, lastname, address, suburb, postcode, email, phonenumber, credits, usertype, userpassword)
              values (
                '${req.body.firstname}',
                '${req.body.lastname}', 
                '${req.body.address}', 
                '${req.body.suburb}',
                '${req.body.postcode}',
                '${req.body.email}', 
                '${req.body.phonenumber}', 
                ${req.body.credits}, 
                '${req.body.usertype}',
                '${req.body.userpassword}'
              )`

  console.log(query);
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results.insertId);
  })
})

app.post('/login', (req, res) => {
  var query = `select * from users where email= '${req.body.email}'`;
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    // console.log(results)
    console.log(results[0].userpassword)
    console.log(req.body.password)
    results[0].userpassword === req.body.password ? res.send(true) : res.status(401).send(false);
  })
})



/*ITEMS*/

app.get('/items/:itemid', (req, res) => {
  var query = `Select * from items where itemid = ${req.params.itemid}`
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results);
  })
})

app.get('/items/seller/:sellerid', (req, res) => {
  var query = `Select * from items where sellerid = ${req.params.sellerid}`
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results);
  })
})

app.post('/items', (req, res) => {
  var query = `INSERT INTO items (itemname, price, itemdescription, sellerid, issold)
              values (
                '${req.body.itemname}',
                ${req.body.price},
                '${req.body.itemdescription}',
                ${req.body.sellerid},
                false
              )`
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results);
  })
})


app.post('/items/search', (req, res) => {
  var suburbs = req.body.suburbs.map(suburb => `'${suburb}'`); //need 'suburb' for SQL query
  var searchString = req.body.searchString;
  var selectedSuburbs = `(${suburbs.join(",")})` //flatten to: ('suburb1','suburb2','suburb3')
  var searchItem = `'%${searchString}%'` //transform to e.g. '%mug%'for SQL like statememt

  var query = `
                select itemid, itemname, price, itemdescription, quantity, suburb, postcode
                from items, users
                where users.userid = items.sellerid
                and suburb in ${selectedSuburbs}
                and itemname like ${searchItem}
              `
  console.log(query);
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results);
  })
})


/*ORDERS*/

app.get('/orders/', (req, res) => {
  var query = `Select * from orders`
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results);
  })
})

app.get('/orders/:orderid', (req, res) => {
  var query = `Select * from orders where orderid = ${req.params.orderid}`
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results);
  })
})

app.get('/orders/seller/:sellerid', (req, res) => {
  var query = `Select * from orders where sellerid = ${req.params.sellerid}`
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results);
  })
})

app.get('/orders/buyer/:buyerid', (req, res) => {
  var query = `Select * from orders where buyerid = ${req.params.buyerid}`
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results);
  })
})

//INSERT ORDER
// GET ORDER ID back through result.insertId
// change issold
//ADD new delivery with the PK and SK = result.insertID. 
app.post('/orders/', (req, res) => {
  
  var itemquery = `
  update items
  set issold = true
  where itemid = ${req.body.itemid}
  `

  var orderquery = `INSERT INTO orders (total, orderdate, orderstatus, buyerid, itemid)
  values (
    ${req.body.total}, 
    '${req.body.orderdate}', 
    '${req.body.orderstatus}',
    ${req.body.buyerid}, 
    ${req.body.itemid}
  )`

  console.log(orderquery);
  conn.query(orderquery, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    var orderid = results.insertId;

    conn.query(itemquery, (error, results, fields) => {
      if(error){
        res.status(500).send(error);
      }
      var url = 'http://ec2-54-205-217-94.compute-1.amazonaws.com:3005/deliveries';
      var dynamodelivery = {
        "PK": orderid.toString(),
        "SK" : orderid.toString(),
        "deliveryfee": req.body.deliveryfee
      };
      console.log(dynamodelivery);

      axios.post(url,dynamodelivery).then((response) => {
        res.send(orderid.toString());
      }).catch((err) => {
        res.status(500).send(err);
      });
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})