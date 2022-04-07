import { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import AuthContext from '../../context/AuthContext';

const axios = require('axios').default;


const mockAddItem = (userDetails) => {
  return userDetails ? true : false;
}


const ItemForm  = () => {
  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault(); 
    let form = e.target;

    let itemDetails = {
      itemname: form.itemname.value,
      itemdescription: form.itemdescription.value,
      price: form.price.value,
      sellerid: form.sellerid.value
    }

    console.log(itemDetails);
    let response = await mockAddItem(itemDetails);
    if(response){
      console.log(response)
      // navigate('/result',{
      //   state:{
      //     msg:`You have successfully added an item. Please log in`, 
      //     link:'login'
      //   }
      // });
    }
  
    // let response = await axios.post({
    //   itemDetails
    // });
  
  }

  return (
    <AuthContext.Consumer>{
      user => (
        <div>
          <Container style={{width:'45%'}}>
            <h1 className="pt-5 text-center" >List an item for sale</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className="m-3 px-5 pt-5" controlId="formBasicName">
                <Form.Label>Item name</Form.Label>
                <Form.Control type="text" name="itemname"/>
              </Form.Group>
              <Form.Group className="m-3 px-5" controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" row={5} name="itemdescription"/>
              </Form.Group>
              <Form.Group className="m-3 px-5" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" min={1} />
              </Form.Group>
              <Form.Control type="hidden" name="sellerid" value={user.userid}/>
              <Container>
                <div className="text-center">
                  <Button className="m-1 px-3" variant="primary" type="submit">
                    Add item
                  </Button>
                </div>
              </Container>
            </Form>
          </Container>
        </div>
      )
    }</AuthContext.Consumer>
  );
}

export default ItemForm;
