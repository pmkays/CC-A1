import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import AuthContext from '../context/AuthContext'
import {useState, useContext, useEffect} from 'react'

const axios = require('axios').default;

const Search = () => {

  const user = useContext(AuthContext);

  const [suburbs, setSuburbs] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.searchString.value);
    let selectedSuburbs = suburbs.filter(x=> x.checked).map(x=> x.suburb);
    console.log(selectedSuburbs);

    // axios.post("url", {
    //   searchString: event.target.searchString.value,
    //   suburbs: suburbs
    // })

  }

  const handleChange = (event) => {
    const currentState = [...suburbs];
    let updated = currentState.map(suburb=>{
      if(suburb.suburb === event.target.name){
        suburb.checked = event.target.checked
      }
      return suburb;
    });

    setSuburbs(updated);
  }

  useEffect( () => {
    const getSuburbs = async () => {
      // console.log(user);
      const baseUrl = "http://api.zippopotam.us/au"
      let response = await axios.get(`${baseUrl}/${user.postcode}`);
      // console.log(response.data);
      let suburbNames = response.data.places.map(x=> ({suburb: x["place name"], checked:false}));
      // console.log(suburbNames)
      setSuburbs(suburbNames);
    }

    getSuburbs().catch(e => console.log(e));
  }, []);

  return(
    <AuthContext.Consumer>{
      user => (
        <Container style={{width:'70%', paddingTop: '25vh'}}>
          <div className="text-center">
            <h3>Welcome {user.name.split(' ')[0]}, what would you like to buy today? </h3>
          </div><br/>
          <Container style={{width:'80%'}} className="text-center">
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <FormControl placeholder="Search for an item..." type="text" name="searchString"/>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </InputGroup>
              <Form.Text className="text-muted">
                We'll automatically use your address to find items in nearby suburbs!
              </Form.Text>
              <Form.Group className="m-3 px-5">
                  <div className="text-center">
                    <Form.Label className="justify-content-center">Which nearby suburb would you like to search in?</Form.Label><br/>
                    {suburbs ? suburbs.map(x => <Form.Check inline label={x.suburb} name={x.suburb} key={x.suburb} onChange={handleChange} type="checkbox"/>) : ''}
                  </div>
              </Form.Group>
            </Form>
          </Container>
        </Container>
      )
    }</AuthContext.Consumer>
  );
}

export default Search;