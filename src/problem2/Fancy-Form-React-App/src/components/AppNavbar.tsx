import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export const AppNavbar: React.FC = () => {
  return (
    <Navbar bg="transparents" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><img src="https://www.99tech.co/assets/img/99Tech.png" alt="" width={50}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Swap</Nav.Link>
            <Nav.Link href="#about">Explore</Nav.Link>
            <Nav.Link href="#services">NFTs</Nav.Link>
            <Nav.Link href="#contact">Pool</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};