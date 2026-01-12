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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown className='custom-text' style={{zIndex: '999'}} title="Leaderboard" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/leaderboards/snes">SNES</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/leaderboards/ps1">PS1</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/leaderboards/ps2">PS2</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/leaderboards/wii">Wii</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;