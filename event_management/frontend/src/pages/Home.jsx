import { useNavigate } from 'react-router-dom';


const HomePage = () => {

    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token');

    return (
        <div className='container-fluid p-0 mt-5'>

            {/* HEADER SECTION */}
            <div className='bg-primary text-white text-center py-5'>
                <div className='container py-5'>
                    <h1 className='display-4 fw-bold mb-3'>Your Events, Your Way</h1>
                    <p className='lead mb-4'>Create, share, and track events with our simple and powerful platform.</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">

                        {isAuthenticated ? (
                            <button className='btn btn-light btn-lg px-4'
                                onClick={() => navigate("/events")}>
                                View Your Events
                            </button>
                        ) : (
                            <>
                                <button className='btn btn-light btn-lg px-4'
                                    onClick={() => navigate('/register')}>
                                    Get Started
                                </button>

                                <button className='btn btn-outline-light btn-lg px-4'
                                    onClick={() => navigate('/login')}>
                                    Login
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>


            {/* Features Section */}
            <div className="py-5">
                <div className="container">
                    <h2 className="text-center display-5 fw-bold mb-5">Why Choose Event Manager?</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="display-4 mb-3">📅</div>
                                    <h3 className="h4">Create Events</h3>
                                    <p className="text-muted">Easily organize and manage your events</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="display-4 mb-3">👥</div>
                                    <h3 className="h4">Track Attendees</h3>
                                    <p className="text-muted">See who's coming to your events</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="display-4 mb-3">🔔</div>
                                    <h3 className="h4">Get Notified</h3>
                                    <p className="text-muted">Never miss an important event</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Call to Action */}
            <div className="py-5">
                <div className="container">
                    <div className="card border-0 text-white py-4" style={{
                        background: 'linear-gradient(135deg, #f6d365, #fda085)',
                        borderRadius: '15px'
                    }}>
                        <div className="card-body text-center p-4">
                            <h2 className="display-6 fw-bold mb-4">Ready to Manage Your Events?</h2>
                            <button
                                className="btn btn-light btn-lg px-4"
                                onClick={() => navigate(isAuthenticated ? '/events/create' : '/register')}
                            >
                                {isAuthenticated ? 'Create New Event' : 'Sign Up Now'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )

}

export default HomePage;