import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// store
import { Provider } from 'react-redux';
import store from './redux/store';
// components
import Home from './components/Home';
import Profile from './components/Profile';
import WorkoutLog from './components/WorkoutLog';
import RecordWorkout from './components/RecordWorkout/RecordWorkout';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
import Header from './components/Header/Header';
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
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
              <Route
                path='/record-workout'
                element={<PrivateRoute element={<RecordWorkout />} />}
              />
            </Routes>
          </div>
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;
