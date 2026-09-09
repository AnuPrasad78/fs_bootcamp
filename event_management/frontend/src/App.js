
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import AppFooter from './components/Footer';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Container } from 'react-bootstrap';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';
import EventsPage from './pages/Events';
import CreateEventPage from './pages/CreateEvent';



const ProtectedRoute = ({ element }) => {

  if (!localStorage.getItem('token')) {
    return <Navigate to={"/login"} />
  }

  return element;
}


function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <Container className='main-content'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path='/events/create' element={<ProtectedRoute element={<CreateEventPage/>}/>}/>


          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>

      <AppFooter />
    </BrowserRouter>
  );
}

export default App;
