import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {useLocation, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import {useContext} from 'react';
import config from '../../config.json'
import AuthContext from '../../context/AuthContext';

const axios = require('axios').default;

const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedDate = dd + '/' + mm + '/' + yyyy;
  return formattedDate;
}


const SearchItems = () => {
  const user = useContext(AuthContext);
  const {state} = useLocation();
  console.log(state)
  let {items, query, suburbs} = state;

  items = items.map(x=>({...x, deliveryfee: parseFloat((Math.random()*3 + 0.5).toFixed(2))}))
  console.log(items);
  let navigate = useNavigate();

  const handleBuy = async (event, itemprice, deliveryfee) => {
    console.log(event.target.value);
    console.log(itemprice);
    console.log(deliveryfee);

    let orderDetails = {
      total: itemprice + deliveryfee, 
      itemprice: itemprice,
      deliveryfee: deliveryfee,
      orderdate: getToday(), 
      buyerid: user.userid,
      itemid: event.target.value
    }
    console.log(orderDetails);
    try{
      let url = `${config["LOCALS_API"]}/orders`
      let response = await axios.post(url, orderDetails);
      if(response){
        navigate('/result',{
          state:{
            msg:`You order has been successful! View`, 
            link:'orders'
          }
        });
      }
    }catch(e){
      console.error(e);
    }
  }

  return(
    <div>
      <Container style={{width:'75%'}}>
        <div className="text-center">
          <h2 className='m-5'>Showing items matching: '{query}' in the following suburbs: {suburbs.join(", ")}</h2>
        </div>
      </Container>
      <Container style={{width:'50%'}}>
        <ListGroup variant="flush">
          {items.map(x => 
            <ListGroup.Item key={x.itemid}>
              <Row>
                <Col>
                <h4 style={{display:'inline'}}>{x.itemname}</h4> &emsp;
                <span>${x.price.toFixed(2)}</span><br/>
                <span>{x.itemdescription}</span><br/>
                <span>Location: {x.suburb}</span>
                </Col>
                <Col xs={3} className="my-auto">
                  <div className="text-center">
                    <Button onClick={(e) => handleBuy(e, x.price, x.deliveryfee)} value={x.itemid}>Buy</Button>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Container>
    </div>
  );
  
}

export default SearchItems;