import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <div className='text-center mt-5'>
            <h1>404 - Page Not Found</h1>
            <p>The Page you are looking for doesn;t exist.</p>
            <Button variant='primary' onClick={() => navigate('/')}>
                Go Home
            </Button>

        </div>
    )

}
export default NotFoundPage;