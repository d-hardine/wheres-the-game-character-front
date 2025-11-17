import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../index.css'

function NavigationBar() {
  return (
    <Navbar expand="lg" className="navbar-custom" data-bs-theme="dark"> {/* expand lg for responsive purpose */}
      <Container>
        <Navbar.Brand as={Link} to="/"  className='custom-text'>Where Are They?</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;