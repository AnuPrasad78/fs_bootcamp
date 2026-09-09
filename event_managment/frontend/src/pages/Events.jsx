import { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Spinner, Alert, Modal, Button, Badge } from 'react-bootstrap';
import { getEvents, filterEvents, rsvpToEvent } from '../api/apiService';
import { useNavigate } from 'react-router-dom';


const EventsPage = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpEmail, setRsvpEmail] = useState('');

    const navigate = useNavigate();

    const isAuthenticated = localStorage.getItem('token');

    useEffect(() => {

        fetchEvents();

    }, [filterDate, filterLocation]);


    const fetchEvents = async () => {

        try {
            let dataFromEventApi;
            if (filterDate || filterLocation) {
                dataFromEventApi = await filterEvents({ date: filterDate, location: filterLocation });
            } else {
                dataFromEventApi = await getEvents();
            }
            console.log(dataFromEventApi);
            setEvents(dataFromEventApi.data || []);
            setLoading(false);

        } catch (error) {
            setError(error.response?.data?.error || 'Failed to fetch events');
            setLoading(false)
            setEvents([])
        }
    }

    const handleRSVP = (eventId) => {
        if (!isAuthenticated) {
            navigate("/login")
            return;
        }
        setSelectedEventId(eventId)
        setShowModal(true);
    }

    const handleModalRSVP = async (e) => {
        e.preventDefault();
        try {

            if (rsvpName && rsvpEmail) {
                await rsvpToEvent(selectedEventId, { name: rsvpName, email: rsvpEmail });
                fetchEvents();
                setShowModal(false)
                setRsvpEmail('')
                setRsvpName('')
            }

        } catch (error) {
            setError(error.response?.data?.error || 'Failed to register an attendee');
            alert(error.response?.data?.error)

        }
    }

    //FOMATE DATE

    const formatDate = (dateString) => {

        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }


    if (loading) {
        return <Spinner animation='border' />
    }

    return (
        <div className='container mt-4'>
            <h2 className="mb-4 p-3 bg-primary bg-opacity-10 rounded d-flex align-items-center gap-3">
                <i className="bi bi-calendar-event text-primary fs-4"></i>
                <span className="text-primary fw-bold">Upcoming Events</span>
            </h2>


            <Card className="mb-4">
                <Card.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Filter by Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={filterDate}
                                        onChange={(e) => setFilterDate(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Filter by Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter location"
                                        value={filterLocation}
                                        onChange={(e) => setFilterLocation(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>


            {error && <Alert variant='danger'>{error}</Alert>}


            <Row xs={1} md={2} lg={3} className="g-4">
                {events.map((event) => (
                    <Col key={event.id}>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>{event.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {formatDate(event.date)}
                                </Card.Subtitle>
                                <Card.Text>
                                    <i className="bi bi-geo-alt"></i> {event.location}
                                </Card.Text>
                                <Card.Text className="text-muted">
                                    <i className="bi bi-person"></i> {event.creator?.name || 'Unknown'}
                                </Card.Text>
                                <div className="d-flex justify-content-between align-items-center">

                                    <Badge bg="transparent" text="primary" border="primary">
                                        <i className="bi bi-people"></i> {event.attendees?.length || 0}
                                    </Badge>

                                    {isAuthenticated ? (
                                        <Button
                                            variant="primary"
                                            onClick={() => handleRSVP(event.id)}
                                        >
                                            <i className="bi bi-calendar-plus"></i> RSVP
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => handleRSVP(event.id)}
                                        >
                                            <i className="bi bi-box-arrow-in-right"></i> Login to RSVP
                                        </Button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>



            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>RSVP to Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleModalRSVP}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={rsvpName}
                                onChange={(e) => setRsvpName(e.target.value)}
                                required
                                placeholder="Enter your name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={rsvpEmail}
                                onChange={(e) => setRsvpEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Confirm RSVP
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default EventsPage;