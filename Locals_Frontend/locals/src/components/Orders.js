import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {useState} from 'react'

const Orders = () => {
  
  //get orders where buyerid = this user
  let orders = [
    {orderid: 1, orderstatus: "Pending", total: 10, orderdate: "25/03/22", buyerid: 2, itemid: 1},
    {orderid: 2, orderstatus: "Pending", total: 15, orderdate: "25/03/22", buyerid: 2, itemid: 2},
    {orderid: 3, orderstatus: "Fulfilled", total: 20, orderdate: "25/03/22", buyerid: 2, itemid: 3}
  ]

  // var itemids = []
  // orders.forEach(x=>itemids.push(x))
  //get items where itemid in array
  let items = [
    {itemid: 1,itemname: "Harry potter mug", price: 10, itemdescription: "A mug that has hogwarts on it", sellerid: 1, issold: true},
    {itemid: 2,itemname: "Marvel superhero mug", price: 15, itemdescription: "A mug that has iron man on it", sellerid: 1, issold: true},
    {itemid: 3, itemname: "Avatar the last airbender mug", price: 20, itemdescription: "A mug that has aang on it", sellerid: 1, issold: true}
  ]

    // var orderids = []
  // orders.forEach(x=>orderids.push(x))
  //get deliveries where pk in array
  let deliveries = [
    {pk: 1, status: "Order Received", deliveryfee: 2, lastupdated: "25/03/22"},
    {pk: 2, status: "Out for Delivery", deliveryfee: 1.50, lastupdated: "25/03/22"},
    {pk: 3, status: "Delivered", deliveryfee: 1, lastupdated: "25/03/22"}
  ]

  const getCompleteOrders = (orders) => {
    // console.log("in get complete orders")
    // console.log(orders)
    let complete = [];

    for (let order of orders){
      // console.log(order)
      let completeOrder; 
      let item = items.find(item => item.itemid === order.itemid);
      // console.log(item)
      let delivery = deliveries.find(delivery => delivery.pk === order.orderid);
      // console.log(delivery)
      completeOrder = {
        ...order,
        item,
        delivery
      }
      // console.log(completeOrder)
      complete.push(completeOrder);
    }
    // console.log(complete)
    return complete;
  }

  const pendingOrdersDefault = () => {
    // console.log("handling pending")
    let ordersPending = orders.filter(x=> x.orderstatus === "Pending");
    // console.log("orders pending")
    let ordersPendingComplete = getCompleteOrders(ordersPending);
    return ordersPendingComplete
  }


  const [filterOrders, setFilteredOrders] = useState(pendingOrdersDefault()); 
  const [title, setTitle] = useState("Pending Orders"); 

  const handleFilter = (event) => {
    // console.log(event)
    switch(parseInt(event)){
      case 0: 
        handlePending();
        break;
      case 1:
        handleFulfilled();
        break;
      default:
        console.log("Dropdown not valid")
    }
  }

  const handlePending = () => {
    let ordersPendingComplete = pendingOrdersDefault();
    setFilteredOrders(ordersPendingComplete);
    setTitle("Pending Orders");

  }

  const handleFulfilled= () => {
    let ordersFulfilled = orders.filter(x=> x.orderstatus === "Fulfilled");
    let ordersFulfilledComplete = getCompleteOrders(ordersFulfilled);
    setFilteredOrders(ordersFulfilledComplete);
    setTitle("Fulfilled Orders");
  }

  return(
    <div>
      <Container style={{width:'50%'}}>
        <Row>
          <Col>
            <h1 className='m-3'>{title}</h1>
          </Col>
          <Col>
          <DropdownButton
              size="sm"
              variant="secondary"
              title="Filter..."
              className="m-4"
              onSelect={handleFilter}
            >
              <Dropdown.Item eventKey="0">Pending</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="1">Fulfilled</Dropdown.Item>
            </DropdownButton>
          </Col>
          <hr/>
        </Row>
            <ListGroup variant="flush">
              {filterOrders.map(x => 
                <ListGroup.Item key={x.orderid}>
                  <h4>{x.item.itemname}</h4>
                  <p>Ordered on: {x.orderdate}</p>
                  <p>Order Status: {x.orderstatus}</p>
                  <p>Item price: ${x.item.price}</p>
                  <p>Total: ${x.total} (incl. delivery)</p>
                  <p>Delivery Status: {x.delivery.status}, last updated on {x.delivery.lastupdated}</p>
                  <p></p>
                </ListGroup.Item>
              )}
            </ListGroup>
      </Container>
    </div>
  );
  
}

export default Orders;