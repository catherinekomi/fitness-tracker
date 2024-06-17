import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import WorkoutLog from './components/WorkoutLog';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
import Header from './components/Header/Header';
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/profile'
              element={<PrivateRoute element={<Profile />} />}
            />
            <Route
              path='/workout-log'
              element={<PrivateRoute element={<WorkoutLog />} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
