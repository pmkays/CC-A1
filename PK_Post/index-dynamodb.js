const express = require('express')
const app = express()
const port = 3005

const AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

const client = new AWS.DynamoDB.DocumentClient();
app.use(express.json());


app.get('/deliveries', (req, res) => {
  var params = {
    TableName: "Cloud-Computing",
  };

  client.scan(params, (err, data) => {
    if (err) {
        console.log(err);
        res.status(500).send(err);
    } else {
        console.log(data);
        res.send(data);
    }
  });
})

const getByDeliveryID = async (id) => {
  var params = {
    TableName: "Cloud-Computing",
    Key: {
        "PK": id,
        "SK": id
    }
  }; 
  var result= await client.get(params).promise();
  return result;
}


app.get('/deliveries/:deliveryid', (req, res) => {
  var id = req.params.deliveryid;
  getByDeliveryID(id)
  .then((data) => {
    console.log(data);
    res.send(data);
  })
  .catch((err) =>{
    console.error(err);
    res.status(500).send(err);
  })
})


const getUpdatedStatus = (current) => {
 var nextStatus; 
 if(current.toLowerCase()==="order received"){
   nextStatus = "Out for Delivery";
 } else if(current.toLowerCase()==="out for delivery" || current.toLowerCase()==="delivered") {
    nextStatus = "Delivered";
 }
 return nextStatus;
}


app.patch('/deliveries/status', (req, res) => {
  var id = req.body.PK
  getByDeliveryID(id)
    .then((data) => {
      var currentStatus = data.Item.status;
      var nextStatus = getUpdatedStatus(currentStatus);
      var params = {
        TableName: "Cloud-Computing",
        Key: {
            "PK": id,
            "SK": id
        },
        UpdateExpression: "set #status = :val, lastupdated =:today",
        ExpressionAttributeNames:{
          "#status" : "status",
      },
        ExpressionAttributeValues:{
            ":val": nextStatus,
            ":today": Date()
        },
        ReturnValues:"UPDATED_NEW"
      }; 

      client.update(params, (err,data) => {
        if (err) {
          console.log(err);
              res.status(500).send(err);
        } else {
            console.log(data);
            res.send(data);
        }
      })
    })
    .catch((err) =>{
      console.error(err);
      res.status(500).send(err);
    })
});

app.post('/deliveries', (req, res) => {
  var params = {
    TableName:"Cloud-Computing",
    Item:{
        "PK": req.body.PK,
        "SK": req.body.SK,
        "deliveryfee": req.body.deliveryfee,
        "status": "Order Received",
        "lastupdated": Date()
    },
    ReturnValues:"ALL_OLD"
  };

  client.put(params, (err) => {
    if (err) {
      console.log(err);
        res.status(500).send(err);
    } else {
        console.log(params.Item);
        res.send(params.Item);
    }
  })    
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(AWS.config.credentials)
})