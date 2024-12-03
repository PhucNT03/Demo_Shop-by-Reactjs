import React from 'react';
import '../../css/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useLoading } from '../../contexts/LoadingContext'; // Import the context

function ProfileDropDown() {
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();
  const authenticated = localStorage.getItem('accounts');

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('accounts');
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  let username = '';
  let id;

  if (authenticated) {
    const user = JSON.parse(authenticated);
    username = user.username;
    id = user.id;
  }

  const handleProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const renderNavLinks = () => {
    if (authenticated) {
      return (
        <>
          <ul className='d-flex flex-column gap-3'>
            <li className='nav-log' onClick={() => handleProfile(id)}>Username: {username}</li>
            <li className='nav-log' onClick={handleLogout}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                'Log Out'
              )}
            </li>
          </ul>
        </>
      );
    } else {
      return (
        <ul className='d-flex flex-column gap-3'>
          <li><Link className='nav-link' to='/login'>Login</Link></li>
          <li><Link className='nav-link' to='/register'>Register</Link></li>
        </ul>
      );
    }
  };

  return (
    <div className='d-flex flex-column dropDownProfile'>
      {renderNavLinks()}
    </div>
  );
}

export default ProfileDropDown;
