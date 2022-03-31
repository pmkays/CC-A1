// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Login from './components/Login';
import Test from './components/Test'
import AuthContext from './context/AuthContext';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (user) => {
    setUser(user)
    setLoggedIn(true);
    // console.log(user)
  }

  const handleLogout = (user) => {
    setUser(null)
    setLoggedIn(false);
    // console.log(user)
  }


  const displayUser = () => {
    return(
      <AuthContext.Provider value={user}>
        <Test/>
      </AuthContext.Provider>
    );
  }

  return (
    <div>
      {isLoggedIn? <button onClick={handleLogout}>Log Out</button>:<Login onLogin={handleLogin}/>}
      {user!=null ? displayUser() : ''}
    </div>
  );
}

export default App;
