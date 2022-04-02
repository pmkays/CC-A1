// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Login from './components/Login';
// import Test from './components/Message'
import AuthContext from './context/AuthContext';
import {useNavigate} from 'react-router-dom';
import Register from './components/Register'
import Message from './components/Message'
import SellerHome from './components/SellerHome'

import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  let navigate = useNavigate(); 


  const handleLogin = (user) => {
    setUser(user)
    setLoggedIn(true);
    navigate("/home");
    
    // console.log(user)
  }

  const handleLogout = (user) => {
    setUser(null)
    setLoggedIn(false);
    navigate("/");

    // console.log(user)
  }


  // const displayUser = () => {
  //   return(
  //     <AuthContext.Provider value={user}>
  //       <Test/>
  //     </AuthContext.Provider>
  //   );
  // }

  return(
    <AuthContext.Provider value={user}>
      <Routes>
        <Route path="login" element={<Login onLogin={handleLogin} />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<SellerHome />} />
        <Route path="result" element={<Message />} />
      </Routes>
      {/* {isLoggedIn && user != null? <button onClick={handleLogout}>Log Out</button>:<Login onLogin={handleLogin} />} */}
    </AuthContext.Provider>
  );

  // return (
  //   <div>
  //     {isLoggedIn? <button onClick={handleLogout}>Log Out</button>:<Login onLogin={handleLogin}/>}
  //     {user!=null ? displayUser() : ''}
  //   </div>
  // );
}

export default App;
