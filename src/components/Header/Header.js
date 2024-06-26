import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Header.css';

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className='header'>
      <nav>
        <ul>
          {currentUser ? (
            <>
              <li>
                <Link to='/profile'>My Profile</Link>
              </li>
              <li>
                <Link to='/workout-log'>My Workouts</Link>
              </li>
              <li>
                <Link to='/record-workout'>Record a Workout</Link>
              </li>
              <li>
                <Link to='/explore'>Explore with Google Map</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/explore'>Explore with Google Map</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
