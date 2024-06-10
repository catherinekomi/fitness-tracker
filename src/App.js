import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import WorkoutLog from './components/WorkoutLog';
import PrivateRoute from './PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
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
  );
}

export default App;
