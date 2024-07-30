import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
// redux
import { useDispatch } from 'react-redux';
import { addWorkout } from '../../redux/actions/workoutActions';
// api
import { fetchWorkouts, addNewWorkout } from '../../api/workoutApi';
// utils
import { formatDate, formatTime } from '../../utils/workoutFunctionality';
// images
import hiking from '../../assets/icons/hiking.png';
import walking from '../../assets/icons/walking.png';
import running from '../../assets/icons/running.png';
// css
import './RecordWorkout.css';

const RecordWorkout = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const [workoutType, setWorkoutType] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      if (!currentUser) return;
      try {
        const workoutsData = await fetchWorkouts(currentUser.uid);
        setWorkouts(workoutsData);
        workoutsData.forEach((workout) => dispatch(addWorkout(workout)));
      } catch (error) {
        console.error('Error fetching workouts: ', error);
      }
    };

    loadWorkouts();
  }, [currentUser, dispatch]);

  const startWorkout = (type) => {
    setWorkoutType(type);
    setIsRecording(true);
    setElapsedTime(0);
    setIsPaused(false);
    setPauseTime(0);

    const start = Date.now();
    setTimer(
      setInterval(() => {
        if (!isPaused) {
          setElapsedTime(Date.now() - start + pauseTime);
        }
      }, 1000)
    );
  };

  const handleStop = () => {
    clearInterval(timer);
    setShowConfirmation(true);
  };

  const confirmStopWorkout = async () => {
    clearInterval(timer);
    const currentDate = new Date().toISOString();
    const workoutData = {
      userId: currentUser.uid,
      type: workoutType,
      duration: elapsedTime,
      date: currentDate,
      formattedDate: formatDate(currentDate),
    };

    console.log('Confirm stop workout:', workoutData);

    try {
      const docId = await addNewWorkout(workoutData);
      console.log('Document written with ID: ', docId);
      setWorkouts([workoutData, ...workouts]);
      dispatch(addWorkout(workoutData));
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      resetState();
    }
  };

  const cancelStopWorkout = () => {
    resetState();
  };

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timer);
    setPauseTime(elapsedTime);
  };

  const handleResume = () => {
    setIsPaused(false);
    const resumeStart = Date.now();
    setTimer(
      setInterval(() => {
        setElapsedTime(Date.now() - resumeStart + pauseTime);
      }, 1000)
    );
  };

  const resetState = () => {
    setShowConfirmation(false);
    setIsRecording(false);
    setIsPaused(false);
    setWorkoutType(null);
    setElapsedTime(0);
    setPauseTime(0);
    clearInterval(timer);
  };

  return (
    <div className='content'>
      <h1>Record a Workout</h1>
      {!isRecording ? (
        <div className='workout-buttons'>
          <button onClick={() => startWorkout('Run')}>
            <img src={running} alt='Running Icon' width='20' height='20' />
            Run
          </button>
          <button onClick={() => startWorkout('Hike')}>
            <img src={hiking} alt='Hiking Icon' width='20' height='20' />
            Hike
          </button>
          <button onClick={() => startWorkout('Walk')}>
            <img src={walking} alt='Walking Icon' width='20' height='20' />
            Walk
          </button>
        </div>
      ) : (
        <div className='workout-buttons'>
          <h2>{workoutType} Workout</h2>
          <p>Elapsed Time: {formatTime(elapsedTime)}</p>
          <button onClick={handleStop}>Stop</button>
          {isPaused ? (
            <button onClick={handleResume}>Resume</button>
          ) : (
            <button onClick={handlePause}>Pause</button>
          )}
        </div>
      )}

      {showConfirmation && (
        <div className='workout-buttons'>
          <p>Are you sure you want to stop recording the workout?</p>
          <button onClick={confirmStopWorkout}>Yes</button>
          <button onClick={cancelStopWorkout}>No</button>
        </div>
      )}

      <div className='workout-log'>
        <h2>Latest activity</h2>
        {workouts.map((workout, index) => (
          <div key={index} className='workout-post'>
            <h3>{workout.type} Workout</h3>
            <p>Duration: {formatTime(workout.duration)}</p>
            <p>Date: {workout.formattedDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordWorkout;
