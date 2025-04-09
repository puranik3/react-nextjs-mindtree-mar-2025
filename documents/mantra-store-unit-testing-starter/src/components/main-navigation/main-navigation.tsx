import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { NavLink } from "react-router-dom";

import { switchTheme } from "../../slices/theme";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../../contexts/theme";

function MainNavigation() {
    // const dispatch = useDispatch();
    const { switchTheme } = useContext(ThemeContext);

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand to="/" as={NavLink}>
                    Home
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link to="/products" as={NavLink} end>
                            Products
                        </Nav.Link>
                        <Nav.Link to="/products/add" as={NavLink}>
                            Add a product
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => switchTheme()}
                            style={{ alignSelf: "center" }}
                        >
                            Change theme
                        </Button>
                        <Nav.Link to="/cart" as={NavLink}>
                            Cart
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNavigation;
