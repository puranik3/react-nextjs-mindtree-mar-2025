import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom'

// Redux imports
// import { toggleTheme, themeSelector } from "../../../features/themeSlice";

// alternative imports
// import { useDispatch } from 'react-redux';
// import { useAppDispatch } from "../../../store";

// import { useSelector } from 'react-redux';
// import { useAppSelector } from '../../../store';

// Context API imports
// import { useTheme } from '../../../contexts/ThemeContext';

// Zustand imports
import useStore from '../../../store.zustand';

import './Menu.scss';

const Menu = () => {
    // context API
    // const { theme, toggleTheme } = useTheme();

    // Redux
    // const dispatch = useAppDispatch();
    // const theme = useAppSelector(themeSelector)

    // Zustand
    const theme = useStore((state) => state.theme);
    const toggleTheme = useStore((state) => state.toggleTheme);

    return (
        <Navbar collapseOnSelect expand="lg" className={`bg-${theme}`}>
            <Container>
                <Navbar.Brand to="/" as={NavLink}>Workshops App</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
                        <Nav.Link to="/workshops" as={NavLink} end>List of workshops</Nav.Link>
                        <Nav.Link to="/workshops/add" as={NavLink}>Add a workshop</Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item to="/workshops/favorites" as={NavLink}>
                            Favorites
                        </NavDropdown.Item>
                        {/* Redux */}
                        {/* <NavDropdown.Item href="#" onClick={() => dispatch(toggleTheme())}>
                            Change Theme
                        </NavDropdown.Item> */}
                        {/* Zustand / Context API */}
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