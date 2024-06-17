import React, { useState } from 'react';

function WorkoutLog() {
  const [workouts, setWorkouts] = useState([]);
  const [workout, setWorkout] = useState({
    type: '',
    duration: '',
    distance: '',
    calories: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
    setWorkout({
      type: '',
      duration: '',
      distance: '',
      calories: '',
      notes: '',
    });
  };

  return (
    <div className='content'>
      <h2>Workout Log</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type</label>
          <input
            type='text'
            name='type'
            value={workout.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Duration</label>
          <input
            type='text'
            name='duration'
            value={workout.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Distance</label>
          <input
            type='text'
            name='distance'
            value={workout.distance}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Calories</label>
          <input
            type='text'
            name='calories'
            value={workout.calories}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes</label>
          <textarea
            name='notes'
            value={workout.notes}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Add Workout</button>
      </form>
      <div>
        <h3>Workout History</h3>
        <ul>
          {workouts.map((workout, index) => (
            <li key={index}>
              <p>Type: {workout.type}</p>
              <p>Duration: {workout.duration}</p>
              <p>Distance: {workout.distance}</p>
              <p>Calories: {workout.calories}</p>
              <p>Notes: {workout.notes}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorkoutLog;
