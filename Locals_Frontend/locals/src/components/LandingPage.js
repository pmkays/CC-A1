import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'

const LandingPage = () =>{
  return(
    <Container styles={{width:'75%'}}>
      <h1>Welcome to the landing page!</h1>
      <Link to="/login">Login</Link><br/>
      <Link to="/register">Register</Link>
    </Container>
  );
}

export default LandingPage;