import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { login } from '../api/apiService';


const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/events');

        } catch (error) {
            setError(error.response?.data?.error || 'Login failed');

        }
    }

    return (
        <div className="col-md-6 mx-auto mt-5">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Your email here.."

                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Create a password"

                            />
                        </Form.Group>

                        <div className="d-grid mb-3">
                            <Button variant="primary" type="submit" size="lg">
                                Login
                            </Button>

                        </div>

                        <div className="text-center">
                            <p className="text-muted">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-decoration-none">
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

        </div>
    )

}

export default LoginPage;