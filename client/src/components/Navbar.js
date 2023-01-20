import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'
import {useAuth, logout} from "../auth";


const LoggedInLinks = () => {
    return (
        <>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/createList">Create List</Nav.Link>
            <Nav.Link href="#" onClick={()=>{logout()}}>Logout</Nav.Link>
        </>
    )
}

const LoggedOutLinks = () => {
    return (
        <>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
        </>
    )
}

const NavBar = () => {
    const [logged] = useAuth()
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    {logged?<LoggedInLinks/>:<LoggedOutLinks/>}

                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar