import { useContext } from 'react';
import { /* Link, */ NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { ThemeContext } from '../../../contexts/ThemeContext';

import './Menu.scss';

const Menu = () => {
    const { toggleTheme, value, textValue } = useContext(ThemeContext);

    return (
        <Navbar collapseOnSelect expand="lg" className={"bg-" + value + " text-" + textValue}>
            <Container>
                <Navbar.Brand as={NavLink} to="/">Workshops App</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/home" end>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/workshops" end>List of workshops</Nav.Link>
                        <Nav.Link as={NavLink} to="/workshops/add" end>Add a workshop</Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item as={NavLink} to="/workshops/favorites">
                            Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#" onClick={toggleTheme}>
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;