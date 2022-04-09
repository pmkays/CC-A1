import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const axios = require('axios').default;


const mockSignIn = (email, password) => {

  const mockUser = {
    email: "a@a.com",
    password: "abc123",
  }

  return (email === mockUser.email && password === mockUser.password) ? true : false;

}


const Login  = (props) => {

  const submitHandler = async (e) => {
    console.log(e);
    e.preventDefault(); 
    let form = e.target;
    console.log(form.email.value);
    console.log(form.password.value);
    let response = await mockSignIn(form.email.value, form.password.value);
  
    const mockUser = {
      email: "a@a.com",
      password: "abc123",
      userid: 1,
      usertype: "seller",
      postcode: "3037",
      name: "Paula Kurniawan"
    }
  
    if(response){
      props.onLogin(mockUser)
    }
    // let response = await axios.post({
    //   email: form.email.value,
    //   password: form.password.value
    // });
  
  }

  return(
    <Container style={{width:'45%'}}>
      <Form onSubmit={submitHandler}>
        <Form.Group className="m-3 px-5 pt-5" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email"/>
        </Form.Group>

        <Form.Group className="m-3 px-5" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" />
        </Form.Group>
        <Container>
          <div className="text-center">
            <Button className="m-1 px-3" variant="primary" type="submit">
              Log in
            </Button>
          </div>
        </Container>
      </Form>
    </Container>
  );

}
export default Login;
