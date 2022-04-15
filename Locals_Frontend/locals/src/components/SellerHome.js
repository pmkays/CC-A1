import AuthContext from '../context/AuthContext'
import NavBar from './NavBar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
const axios = require('axios').default;


const SellerHome  = (props) => {

  return(
    <AuthContext.Consumer>{
      user => (
        <Container style={{width:'70%', paddingTop: '25vh'}}>
          <div className="text-center">
            <h1>Welcome {user.firstname}, what would you like to do today? </h1>
            <div className="text-center">
              <br/>
              <Link to="/items"><Button>View items</Button></Link> &nbsp;
              <Link to="/items/create"><Button>Add new item</Button></Link>
            </div>
          </div>
        </Container>
      )
    }</AuthContext.Consumer>  
  );

}
export default SellerHome;
