// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Login from './components/Login';
// import Test from './components/Message'
import AuthContext from './context/AuthContext';
import {useNavigate} from 'react-router-dom';
import Register from './components/Register/Register'
import Message from './components/Message'
import SellerHome from './components/SellerHome'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import ItemForm from './components/Items/ItemForm'

import {Routes, Route} from 'react-router-dom';
import Items from './components/Items/Items';
import Orders from './components/Orders'
import Search from './components/Search'
import SearchItems from './components/Items/SearchItems';


function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  let navigate = useNavigate(); 


  const handleLogin = (user) => {
    setUser(user)
    setLoggedIn(true);
    if(user.usertype === "seller"){
      navigate("/home")
    } else { 
      navigate("/search")
    }
    
  }

  const handleLogout = () => {
    setUser(null)
    setLoggedIn(false);
    navigate("/");
  }

  return(
    <div>
      <AuthContext.Provider value={user}>
        <NavBar onlogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="login" element={<Login onLogin={handleLogin} />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<SellerHome />} />
          <Route path="result" element={<Message />} />
          <Route path="items" element={<Items/>} />
          <Route path="items/create" element={<ItemForm user={user}/>} />
          <Route path="orders" element={<Orders/>} />
          <Route path="search" element={<Search/>} />
          <Route path="search/items" element={<SearchItems/>} />
        </Routes>
      </AuthContext.Provider>
    </div>

  );
}

export default App;
