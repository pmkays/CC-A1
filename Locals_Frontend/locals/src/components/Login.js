
const axios = require('axios').default;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const mockSignIn = (email, password) => {

  const mockUser = {
    email: "a@a.com",
    password: "abc123"
  }

  return (email === mockUser.email && password === mockUser.password) ? true : false;

}


const Login  = (props) => {

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
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>Email</label><br/>
          <input name='email' type='text'/>
        </div>
        <div>
          <label>Password</label><br/>
          <input name ='password' type='password'/>
        </div>
        <div>
          <button name='submit' type='submit'>Sign in</button>
        </div>
      </form>
    </div>
  );

}
export default Login;
