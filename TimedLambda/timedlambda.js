//timed lambda function that updates orders and deliveries every 24 hours
app.get('/updateDelivery', (req, res) => {
  var query = "select * from orders where orderstatus = pending"
  conn.query(query, (error, results, fields) => {
    if(error){
      console.error(error.stack);
      res.send(error);
    }
    results.forEach(order => {
      
      order.deliveryid

    })
    res.send(results);
  })
})