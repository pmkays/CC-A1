import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

const LandingPage = () =>{
  return(
    <Container style={{width:'70%', paddingTop: '25vh'}}>
      <div className="text-center">
        <h1>Welcome to</h1>
        <Image src={require("../Locals_logo.png")} fluid alt="locals logo" style={{maxWidth:'60%'}}/>
        <div className="text-center">
          <br/>
          <Link to="/register"><Button>Register</Button></Link> &nbsp;
          <Link to="/login"><Button>Login</Button></Link>
        </div>
      </div>
    </Container>
  )
}

export default LandingPage;