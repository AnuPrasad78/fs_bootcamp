
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = () => {

    const isAuthenticated = localStorage.getItem('token');
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
    }


    return (

        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
                <Navbar.Brand as={NavLink} to={"/"}>Event Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <Nav.Link as={NavLink} to={"/"}>Home </Nav.Link>
                        <Nav.Link as={NavLink} to={"/events"}>Events </Nav.Link>

                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={NavLink} to={"/events/create"}>Create Event</Nav.Link>
                                <Nav.Link onClick={handleLogout} >Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to={"/login"}>Login </Nav.Link>
                                <Nav.Link as={NavLink} to={"/register"}>Register </Nav.Link>
                            </>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )
}


export default AppNavbar;