import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {useState, useEffect, useContext} from 'react'
import config from '../config.json'
import AuthContext from '../context/AuthContext'

const axios = require('axios').default;


const Orders = () => {

  const user = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [filterOrders, setFilteredOrders] = useState([]); 
  const [title, setTitle] = useState("Pending Orders"); 

  useEffect( () => {
    const getOrders = async () => {
      let url =`${config["LOCALS_API"]}/orders/buyer/${user.userid}`;
      let response = await axios.get(url);
      let rawOrders = response.data;
      console.log(rawOrders);
      setOrders(rawOrders);
      setFilteredOrders(rawOrders.filter(x=> x.orderstatus === "Pending"))
      console.log(orders);
    }

    getOrders().catch(e => console.log(e));
  }, []);
  

  // const pendingOrdersDefault = () => {
  //   // console.log("handling pending")
  //   let ordersPending = orders.filter(x=> x.orderstatus === "Pending");
  //   // console.log("orders pending")
  //   let ordersPendingComplete = getCompleteOrders(ordersPending);
  //   return ordersPendingComplete
  // }

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
    let ordersPending = orders.filter(x=> x.orderstatus === "Pending");
    setFilteredOrders(ordersPending);
    setTitle("Pending Orders");

  }

  const handleFulfilled= () => {
    let ordersFulfilled = orders.filter(x=> x.orderstatus === "Fulfilled");
    setFilteredOrders(ordersFulfilled);
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
                  <h4>{x.itemname}</h4>
                  <p>Ordered on: {x.orderdate}</p>
                  <p>Order Status: {x.orderstatus}</p>
                  <p>Item price: ${x.price}</p>
                  <p>Total: ${x.total} (incl. delivery)</p>
                  <p>Delivery Status: {x.status}, last updated on {x.lastupdated}</p>
                  <p></p>
                </ListGroup.Item>
              )}
            </ListGroup>
      </Container>
    </div>
  );
  
}

export default Orders;