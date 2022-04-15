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

const getFormattedDate = (dateString) => {
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  }

  let values = dateString.split(" "); 
  let day = values[2];
  let year = values[3];
  let month = months[values[1]];
  return `${day}/${month}/${year}`;
}

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
  

  const handleFilter = (event) => {
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
                  <p>Item price: ${x.price.toFixed(2)}</p>
                  <p>Delivery fee: ${x.deliveryfee.toFixed(2)}</p>
                  <p>Total: ${x.total.toFixed(2)} (incl. delivery)</p>
                  <p>Delivery Status: {x.status}, last updated on {getFormattedDate(x.lastupdated)}</p>
                  <p></p>
                </ListGroup.Item>
              )}
            </ListGroup>
      </Container>
    </div>
  );
  
}

export default Orders;