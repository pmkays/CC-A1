import AuthContext from '../context/AuthContext'
import NavBar from './NavBar'


const axios = require('axios').default;


const SellerHome  = (props) => {

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
