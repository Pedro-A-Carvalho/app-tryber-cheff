import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileCards from '../components/ProfileCards';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserEmail(user.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Header>Profile</Header>
      <span data-testid="profile-email">{userEmail}</span>
      <ProfileCards />
      <Footer />
      <Button
        variant="secondary"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Logout
      </Button>
      {' '}

    </>
  );
}

export default Profile;
