import AuthContext from '../context/AuthContext'

const Test = () => {
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
  )
}

export default Test;