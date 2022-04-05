import { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const axios = require('axios').default;


const mockRegister = (userDetails) => {
  return userDetails ? true : false;
}


const Register  = (props) => {
  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault(); 
    let form = e.target;

    let userDetails = {
      name: form.name.value,
      email: form.email.value,
      address: form.address.value,
      accounttype: form.accounttype.value,
      credits: form.credits.value,
      password: form.password.value,
    }

    console.log(userDetails);
    let response = await mockRegister(userDetails);
    if(response){
      console.log(response)
      navigate('/result',{
        state:{
          msg:`You have successfully signed up for an account. Please log in`, 
          link:'login'
        }
      });
    }
  
    // let response = await axios.post({
    //   userDetails
    // });
  
  }

  return(
    <div>
      <Container style={{width:'45%'}}>
        <h1 className="pt-5 text-center" >Get started with Locals today!</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="m-3 px-5 pt-5" controlId="formBasicName">
            <Form.Label>Full name</Form.Label>
            <Form.Control type="text" placeholder="Enter full name" name="name"/>
          </Form.Group>
          <Form.Group className="m-3 px-5" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email"/>
          </Form.Group>
          <Form.Group className="m-3 px-5" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" name="address"/>
          </Form.Group>
          <Form.Group className="m-3 px-5" controlId="formBasicAccountType">
            <Form.Label>Account type</Form.Label>
            <Form.Select aria-label="account type" name="accounttype">
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="m-3 px-5" controlId="formBasicCredits">
            <Form.Label>Credits</Form.Label>
            <Form.Control type="number" placeholder="Enter credits" name="credits" />
          </Form.Group>
          <Form.Group className="m-3 px-5" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" name="password" />
          </Form.Group>
          <Container>
            <div className="text-center">
              <Button className="m-1 px-3" variant="primary" type="submit">
                Register
              </Button>
            </div>
          </Container>
        </Form>
      </Container>
    </div>
  );

}
export default Register;
