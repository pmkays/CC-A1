const mysql = require('mysql');
const express = require('express');
var cors = require('cors');
const app = express()
const port = 3004

const util = require('util');
const { query } = require('express');


app.use(express.json());
app.use(cors());

const axios = require('axios').default;
// var pkpostURL = "http://localhost:3005"
var pkpostURL="http://ec2-54-175-113-168.compute-1.amazonaws.com:3005"

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
  var query = `insert into users (firstname, lastname, phonenumber, address, suburb, postcode, email, credits, usertype, password)
              values (
                '${req.body.firstname}',
                '${req.body.lastname}', 
                '${req.body.phonenumber}',
                '${req.body.address}', 
                '${req.body.suburb}',
                '${req.body.postcode}',
                '${req.body.email}', 
                ${req.body.credits}, 
                '${req.body.usertype}',
                '${req.body.password}'
              )`

  console.log(query);
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    console.log(results);
    res.send(results.insertId.toString());
  })
})

app.post('/login', (req, res) => {
  var query = `select * from users where email= '${req.body.email}'`;
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.status(500).send(error);
    }
    results[0]?.password === req.body.password ? res.send(results[0]) : res.status(401).send(false);
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
                select itemid, itemname, price, itemdescription, suburb, postcode
                from items, users
                where users.userid = items.sellerid
                and suburb in ${selectedSuburbs}
                and itemname like ${searchItem}
                and !issold
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

app.get('/orders/buyer/:buyerid', async (req, res) => {
  var getOrders = `Select * from orders, items where orders.itemid=items.itemid and buyerid = ${req.params.buyerid}`
  const query = util.promisify(conn.query).bind(conn);
  try{
    const orders = await query(getOrders);
    let ordersWithDeliveries =[];
    for(order of orders){
      console.log(`${pkpostURL}/deliveries/${order.orderid}`);
      let response = await axios.get(`${pkpostURL}/deliveries/${order.orderid}`);
      console.log(response.data)
      orderDetails = {
        ...order,
        lastupdated: response.data.Item.lastupdated, 
        deliveryfee: response.data.Item.deliveryfee,
        status: response.data.Item.status
      }
      ordersWithDeliveries.push(orderDetails);
    }
    res.send(ordersWithDeliveries);

  } catch(e){
    console.error(e);
    res.status(500).send(error);
  }
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
    'Pending',
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
      var url = `${pkpostURL}/deliveries`;
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


updateDeliveryStatus = async (orderid) => {
  var url = `${pkpostURL}/deliveries/status`;
  var dynamodelivery = {
    "PK": orderid.toString(),
    "SK" : orderid.toString(),
  };

  await axios.patch(url,dynamodelivery).then((response) =>{
    console.log(`Delivery with order id ${orderid} updated`);
    console.log(response.data);

  }).catch((err) => {
    console.log("Axios error");
    console.log(err.stack);
  })
}

getDynamoParams= (orderid) => {
  var params = {
    "PK": orderid.toString(),
    "SK" : orderid.toString(),
  };
  return params;
}

formatReturnData = (data, orderDelivered, orderid) => {
  var orderstatus = orderDelivered ? "Fulfilled" : "Pending";
  var formatted = {
    ... data,
    orderid,
    orderstatus
  }
  return formatted;
}

app.get('/timedfunction', async (req, res) => {
  var url = `${pkpostURL}/deliveries/status`;
  var getPendingOrders = `Select * from orders where orderstatus = 'Pending'`;

  try{
    const query = util.promisify(conn.query).bind(conn);
    const orders = await query(getPendingOrders);
    console.log(orders);
    var deliveriesUpdated = [];

    for(var i =0; i < orders.length; i++){
      var params = getDynamoParams(orders[i].orderid);
      var updateOrderStatus= `Update orders set orderstatus ='Fulfilled' where orderid = ${orders[i].orderid} `

      try{
        const deliveryUpdated = await axios.patch(url,params);
        // console.log("AFTER AXIOS")
        var orderDelivered = false;
        if(deliveryUpdated.data.Attributes.status === "Delivered"){
          await query(updateOrderStatus);
          orderDelivered = true;
          // console.log("Order status updated");
        }
        var formatted = formatReturnData(deliveryUpdated.data.Attributes, orderDelivered, orders[i].orderid);
        deliveriesUpdated.push(formatted);
      } catch (error){
        // console.log(error);
        res.status(500).send(error)
      }
    }
    // console.log("ALL DELVIERIES UPDATED")
    // console.log(deliveriesUpdated)
    res.send(deliveriesUpdated);

  } catch(error){
    res.status(500).send(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})