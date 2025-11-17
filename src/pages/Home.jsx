import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import snesImage from '../assets/snes-image-small.jpeg'
import ps1Image from '../assets/ps1-image-small.jpeg'
import ps2Image from '../assets/ps2-image-small.jpeg'
import wiiImage from '../assets/wii-image-small.jpeg'
import '../index.css'

function Home() {
  return (
    <>
      <div className="d-flex flex-column pt-5 justify-content-center align-items-center custom-text">
        <h1 className='text-center'>The Game Characters, Where Are They?</h1>
        <h3 className='text-center'>Can you find them all?</h3>
      </div>
      <p className='mt-5 custom-text'>Pick the game console that you want to play.</p>
      <Row className='mt-2 g-2'>
        <Col>
          <Card>
            <Card.Body>
              <Card.Text className='text-center custom-text'>Nintendo SNES</Card.Text>
            </Card.Body>
            <Link to="/game/snes"><Card.Img variant="bottom" src={snesImage} className='grayscale-image-effect' /></Link>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Text className='text-center custom-text'>Sony PlayStation</Card.Text>
            </Card.Body>
            <Link to="/game/ps1"><Card.Img variant="bottom" src={ps1Image} className='grayscale-image-effect' /></Link>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Text className='text-center custom-text'>Sony PlayStation 2</Card.Text>
            </Card.Body>
            <Link to="/game/ps2"><Card.Img variant="bottom" src={ps2Image} className='grayscale-image-effect' /></Link>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Text className='text-center custom-text'>Nintendo Wii</Card.Text>
            </Card.Body>
            <Link to="/game/wii"><Card.Img variant="bottom" src={wiiImage} className='grayscale-image-effect' /></Link>
          </Card>
        </Col>
      </Row>
      <p className='p-4 text-center'>Arts By <a href="https://www.artstation.com/pierreroussel" target='_blank'>Pierre Roussel</a></p>
    </>
  );
}

export default Home;