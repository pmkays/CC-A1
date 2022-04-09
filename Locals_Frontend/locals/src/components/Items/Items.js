import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Items = () => {

  let items = [
    {itemid: 1,itemname: "Harry potter mug", price: 10, itemdescription: "A mug that has hogwarts on it", sellerid: 1, issold: true},
    {itemid: 2,itemname: "Marvel superhero mug", price: 15, itemdescription: "A mug that has iron man on it", sellerid: 1, issold: true},
    {itemid: 3, itemname: "Avatar the last airbender mug", price: 20, itemdescription: "A mug that has aang on it", sellerid: 1, issold: true}
  ]

  return(
    <div>
      <Container style={{width:'75%'}}>
        <Row>
          <Col>
            <h1 className='m-3'>On the market</h1>
            <ListGroup variant="flush">
              {items.map(x => 
                <ListGroup.Item key={x.itemid}>
                  <h3>{x.itemname}</h3>
                  <p>${x.price}</p>
                  <p>{x.itemdescription}</p>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
          <Col>
            <h1 className='m-3'>Sold</h1>
            <ListGroup variant="flush">
              {items.map(x => 
                <ListGroup.Item key={x.itemid}>
                  <h3>{x.itemname}</h3>
                  <p>{x.price}</p>
                  <p>{x.itemdescription}</p>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
  
}

export default Items;