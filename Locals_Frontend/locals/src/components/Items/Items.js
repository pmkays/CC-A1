import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {useState, useEffect, useContext} from 'react'
import config from '../../config.json'
import AuthContext from '../../context/AuthContext'

const axios = require('axios').default;

const Items = () => {
  const user = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [filterItems, setFilteredItems] = useState([]); 
  const [title, setTitle] = useState("On the market"); 

  useEffect( () => {
    const getItems = async () => {
      let url =`${config["LOCALS_API"]}/items/seller/${user.userid}`;
      let response = await axios.get(url);
      let rawItems = response.data;
      setItems(rawItems);
      setFilteredItems(rawItems.filter(x=>!x.issold))
      console.log(items);
    }

    getItems().catch(e => console.log(e));
  }, []);

  const handleFilter = (event) => {
    console.log(event)
    switch(parseInt(event)){
      case 0: 
        handleOnTheMarket();
        break;
      case 1:
        handleSold();
        break;
      default:
        console.log("Dropdown not valid")
    }
  }

  const handleOnTheMarket = () => {
    let itemsForSale = items.filter(x=> !x.issold);
    setFilteredItems(itemsForSale);
    setTitle("On the market");

  }

  const handleSold = () => {
    let itemsSold = items.filter(x=> x.issold);
    setFilteredItems(itemsSold);
    setTitle("Sold");

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
              <Dropdown.Item eventKey="0">On the Market</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="1">Sold</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
            <ListGroup variant="flush">
              {filterItems.map(x => 
                <ListGroup.Item key={x.itemid}>
                  <h4>{x.itemname}</h4>
                  <p>{x.price}</p>
                  <p>{x.itemdescription}</p>
                </ListGroup.Item>
              )}
            </ListGroup>
      </Container>
    </div>
  );
  
}

export default Items;