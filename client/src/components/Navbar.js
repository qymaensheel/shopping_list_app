import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useAuth, logout} from "../auth";


const LoggedInLinks = () => {
    return (
        <>
            <Nav.Link href="/" data-testid="href-home">Home</Nav.Link>
            <Nav.Link href="/createList" data-testid="href-create">Create List</Nav.Link>
            <Nav.Link href="#" onClick={()=>{logout()}} data-testid="href-logout">Logout</Nav.Link>
        </>
    )
}

const LoggedOutLinks = () => {
    return (
        <>
            <Nav.Link href="/"data-testid="href-home">Home</Nav.Link>
            <Nav.Link href="/register" data-testid="href-register">Register</Nav.Link>
            <Nav.Link href="/login" data-testid="href-login">Login</Nav.Link>
        </>
    )
}

const NavBar = () => {
    const [logged] = useAuth()
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">ShoppingApp</Navbar.Brand>
                <Nav className="me-auto">
                    {logged?<LoggedInLinks/>:<LoggedOutLinks/>}

                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar