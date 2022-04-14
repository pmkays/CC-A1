import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import config from '../config.json'
const axios = require('axios').default;
axios.defaults.baseURL= config["LOCALS_API"];


const Login  = (props) => {

  const submitHandler = async (e) => {
    console.log(e);
    e.preventDefault(); 
    let form = e.target;
    console.log(form.email.value);
    console.log(form.password.value);
    
    let response = await axios.post('/login',{
      email: form.email.value,
      password: form.password.value
    });  
  
    if(response){
      console.log(response.data)
      props.onLogin(response.data)
    }

  
  }

  return(
    <Container style={{width:'45%'}}>
      <div className="text-center pt-5">
        <h1>Login</h1>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group className="m-3 px-5 pt-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email"/>
        </Form.Group>
        <Form.Group className="m-3 px-5" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" />
        </Form.Group>
        <Container>
          <div className="text-center">
            <Button style={{width:'82%'}} variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Container>
      </Form>
    </Container>
  );

}
export default Login;
