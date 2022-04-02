import AuthContext from '../context/AuthContext'



const axios = require('axios').default;


const mockSignIn = (email, password) => {

  const mockUser = {
    email: "a@a.com",
    password: "abc123"
  }

  return (email === mockUser.email && password === mockUser.password) ? true : false;

}


const SellerHome  = (props) => {

  const submitHandler = async (e) => {
    e.preventDefault(); 
    let form = e.target;
    console.log(form.email.value);
    console.log(form.password.value);
    let response = await mockSignIn(form.email.value, form.password.value);
  
    const mockUser = {
      email: "a@a.com",
      password: "abc123"
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
    <AuthContext.Consumer>{
      user => (
        <div>
          <h1>{user.email}</h1>
          <h1>{user.password}</h1>
        </div>

      )
    }
    </AuthContext.Consumer>
  );

}
export default SellerHome;
