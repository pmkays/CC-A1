import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import AuthContext from '../context/AuthContext'
import {Link} from 'react-router-dom'

const NavBar = (props) => {

  const showNavItems = (user) =>{
    console.log(user)
    let navLinks = []; 

    if(user){
      navLinks.push(<Nav.Link href="/" key={0}>Logout</Nav.Link>);
      if(user.usertype === "seller"){
        navLinks.push(<Nav.Link as={Link} to="/items" key={1}>Items</Nav.Link>);
      }
    }
    console.log(navLinks)
    return navLinks;

  }

  return(
    <AuthContext.Consumer>{
      user => (
        <Navbar bg="primary" variant="dark">
          <Container>
          <Navbar.Brand href="/">Locals</Navbar.Brand>
          <Nav className="me-auto">
            {showNavItems(user).map(x => x)}
          </Nav>
          </Container>
        </Navbar>
      )
    }
    </AuthContext.Consumer>
  );
}

export default NavBar;