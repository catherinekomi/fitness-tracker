import React from 'react';
import { useSelector } from 'react-redux';
import { formatTime } from '../utils/workoutFunctionality';

function WorkoutLog() {
  const workouts = useSelector((state) => state.workout.workouts);

  return (
    <div className='content'>
      <h2>Workout Log</h2>
      <h3>Recorded Workouts</h3>
      <div>
        <ul>
          {workouts.map((workout, index) => (
            <li key={index}>
              <p>Type: {workout.type}</p>
              <p>Duration: {formatTime(workout.duration)}</p>
              <p>Date: {workout.formattedDate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorkoutLog;
