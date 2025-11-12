import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavigationBar from './components/Navbar'
import './index.css'

function App() {
  return (
    <>
    <NavigationBar />
    <Container>
      <Row>
        <Col>
           <span className='text-white'>Hello </span>
           <span className='text-light'>World</span>
           <div className='custom-text text-white'>test</div>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default App
