import { /* Link, */ NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useAppDispatch, useAppSelector } from "../../../store";
import { toggleTheme, themeSelector } from "../../../features/themeSlice";

import './Menu.scss';

const Menu = () => {
    const dispatch = useAppDispatch();

    // gives you the piece of state you want
    // also sets up the subscription, and the component re-renders only when the selected state changes
    // re-rendering is thus efficient
    const theme = useAppSelector(themeSelector);

    return (
        <Navbar collapseOnSelect expand="lg" className={"bg-" + theme}>
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
                        <NavDropdown.Item href="#" onClick={() => dispatch(toggleTheme("Some payload from Menu"))}>
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;