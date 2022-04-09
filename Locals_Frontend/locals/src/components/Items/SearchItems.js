import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {useState} from 'react'
import {useLocation, Link} from 'react-router-dom';


const SearchItems = () => {
  const {state} = useLocation();
  console.log(state)
  const {items, query, suburbs} = state;
  console.log(suburbs);
  // console.log(link);

  // let items = [
  //   {itemid: 1,itemname: "Harry potter mug", price: 10, itemdescription: "A mug that has hogwarts on it", sellerid: 1, issold: true},
  //   {itemid: 2,itemname: "Marvel superhero mug", price: 15, itemdescription: "A mug that has iron man on it", sellerid: 1, issold: true},
  //   {itemid: 3, itemname: "Avatar the last airbender mug", price: 20, itemdescription: "A mug that has aang on it", sellerid: 1, issold: true},
  //   {itemid: 4, itemname: "Avatar the last airbender mug", price: 20, itemdescription: "A mug that has aang on it", sellerid: 1, issold: false},
  //   {itemid: 5, itemname: "Avatar the last airbender mug", price: 20, itemdescription: "A mug that has aang on it", sellerid: 1, issold: false}
  // ]

  // let itemsForSale = items.filter(x=> x.issold);
  // let itemsSold = items.filter(x=> !x.issold);

  // const [filterItems, setFilteredItems] = useState(itemsForSale); 
  // const [title, setTitle] = useState("On the market"); 

  // const handleFilter = (event) => {
  //   console.log(event)
  //   switch(parseInt(event)){
  //     case 0: 
  //       handleOnTheMarket();
  //       break;
  //     case 1:
  //       handleSold();
  //       break;
  //     default:
  //       console.log("Dropdown not valid")
  //   }
  // }

  // const handleOnTheMarket = () => {
  //   setFilteredItems(itemsForSale);
  //   setTitle("On the market");

  // }

  // const handleSold = () => {
  //   setFilteredItems(itemsSold);
  //   setTitle("Sold");

  // }

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
              <h4>{x.itemname}</h4>
              <p>${x.price}</p>
              <p>{x.itemdescription}</p>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Container>
    </div>
  );
  
}

export default SearchItems;