import { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Message from './Message'

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
      <h1>Get started with Locals today!</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Full Name</label><br/>
          <input name='name' type='text'/>
        </div>
        <div>
          <label>Email</label><br/>
          <input name='email' type='text'/>
        </div>
        <div>
          <label>Address</label><br/>
          <input name='address' type='text'/>
        </div>
        <div>
          <label>Account type</label><br/>
          <select name="accounttype">
            <option>Buyer</option>
            <option>Seller</option>
          </select>
        </div>
        <div>
          <label>Credits</label><br/>
          <input name='credits' type='number'/>
        </div>
        <div>
          <label>Password</label><br/>
          <input name ='password' type='password'/>
        </div>
        <div>
          <button name='submit' type='submit'>Register</button>
        </div>
      </form>
    </div>
  );

}
export default Register;
