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
      if(user.usertype === "seller"){
        navLinks.push(<Nav.Link as={Link} to="/items" key={1}>Items</Nav.Link>);
        navLinks.push(<Nav.Link as={Link} to="/items/create" key={2}>Create Item</Nav.Link>);
      }
    }
    console.log(navLinks)
    return navLinks;

  }

  let rightNavLink = (user) => {
    return user ? <Nav.Link href="/" className="p-0">Logout</Nav.Link> : <Nav.Link href="/login" className="p-0">Login</Nav.Link>
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
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {rightNavLink(user)}
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )
    }
    </AuthContext.Consumer>
  );
}

export default NavBar;