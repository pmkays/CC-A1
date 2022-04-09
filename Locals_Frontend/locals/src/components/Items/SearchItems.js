import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {useState} from 'react'
import {useLocation, Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom';



const SearchItems = () => {
  const {state} = useLocation();
  console.log(state)
  const {items, query, suburbs} = state;
  console.log(suburbs);
  let navigate = useNavigate();

  const handleBuy = (event) => {
    console.log(event.target.value);
    //make order here. 
    let response = true;
    if(response){
      console.log(response)
      navigate('/result',{
        state:{
          msg:`You order has been successful! View`, 
          link:'orders'
        }
      });
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
                <span>${x.price}</span> <br/>
                <span>{x.itemdescription}</span>
                </Col>
                <Col xs={3} className="my-auto">
                  <div className="text-center">
                    <Button onClick={handleBuy} value={x.itemid}>Buy</Button>
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