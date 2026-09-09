import { Container, Navbar } from "react-bootstrap";

const AppFooter = () => {
    return (
        <Navbar bg="dark" variant="dark" fixed="bottom">

            <Container className="justify-content-center">
                <Navbar.Text>
                    &copy; {new Date().getFullYear()} Event Manager - All Rights Reserved
                </Navbar.Text>
            </Container>

        </Navbar>
    )
}

export default AppFooter;