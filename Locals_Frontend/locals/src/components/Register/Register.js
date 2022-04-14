import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import AddressInput from '../Register/AddressInput'
import config from '../../config.json'

const axios = require('axios').default;

const Register  = (props) => {
  const [addressDetails, setAddressDetails] = useState();

  let navigate = useNavigate();

  const addressHandler = (address, suburb, postcode) => {
    const stateObj = {
      address: address, 
      suburb: suburb, 
      postcode: postcode
    }
    setAddressDetails(stateObj);
  }

  const submitHandler = async (e) => {
    e.preventDefault(); 
    let form = e.target;

    let userDetails = {
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      phonenumber: form.phonenumber.value,
      email: form.email.value,
      address: addressDetails.address,
      postcode: addressDetails.postcode,
      suburb: addressDetails.suburb,
      usertype: form.usertype.value,
      credits: form.credits.value,
      password: form.password.value,
    }

    console.log(userDetails);
    let url = `${config["LOCALS_API"]}/users`
    let response = await axios.post(url, userDetails);
    if(response){
      console.log(response)
      navigate('/result',{
        state:{
          msg:`You have successfully signed up for an account. Please`, 
          link:'login'
        }
      });
    }
  
  }

  return(
    <div>
      <Container style={{width:'45%'}}>
        <h1 className="pt-5 text-center" >Get started with Locals today!</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="m-3 px-5 pt-5" controlId="formBasicFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" name="firstname"/>
          </Form.Group>
          <Form.Group className="m-3 px-5" controlId="formBasicLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" name="lastname"/>
          </Form.Group>
          <Form.Group className="m-3 px-5" controlId="formBasicPhoneNumber">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" name="phonenumber"/>
          </Form.Group>
          <Form.Group className="m-3 px-5" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email"/>
          </Form.Group>
          <Form.Group className="m-3 px-5" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <AddressInput className="form-control" handleAddress={addressHandler}/>
          </Form.Group>
          <Form.Group className="m-3 px-5" controlId="formBasicAccountType">
            <Form.Label>User type</Form.Label>
            <Form.Select aria-label="user type" name="usertype">
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
