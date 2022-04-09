import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

const Search = () => {

  const handleSubmit = () => {

  }

  return(
    <Container style={{width:'70%', paddingTop: '25vh'}}>
      <div className="text-center">
        <h3>Welcome person, what would you like to buy today? </h3>
      </div><br/>
      <Container style={{width:'80%'}} className="text-center">
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <FormControl placeholder="Search for an item..."/>
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
                <Form.Check inline label="0" name="test" type="checkbox"/>
                <Form.Check inline label="1" name="test" type="checkbox"/>
                <Form.Check inline label="2" name="test" type="checkbox"/>
              </div>
          </Form.Group>
        </Form>
      </Container>
    </Container>
  );
}

export default Search;