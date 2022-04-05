import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import AuthContext from '../context/AuthContext'

const NavBar = (props) => {
  return(
    <AuthContext.Consumer>{
      user => (
        <Navbar bg="primary" variant="dark">
          <Container>
          <Navbar.Brand href="/">Locals</Navbar.Brand>
          <Nav className="me-auto">
            {user ? <Nav.Link href="/">Logout </Nav.Link> : ''}
            {/* <Nav.Link href="/">Logout</Nav.Link> */}
          </Nav>
          </Container>
        </Navbar>
      )
    }
    </AuthContext.Consumer>
  );
}

export default NavBar;