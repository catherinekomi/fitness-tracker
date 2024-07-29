import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
// redux
import { useDispatch } from 'react-redux';
import { addWorkout } from '../../redux/actions/workoutActions';
// css
import './RecordWorkout.css';
// utils
import { formatDate, formatTime } from '../../utils/workoutFunctionality';
// add images
import hiking from '../../assets/icons/hiking.png';
import walking from '../../assets/icons/walking.png';
import running from '../../assets/icons/running.png';

const RecordWorkout = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const [workoutType, setWorkoutType] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const q = query(
          collection(db, 'workouts'),
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const workoutsData = querySnapshot.docs.map((doc) => doc.data());
        setWorkouts(workoutsData);
        workoutsData.forEach((workout) => {
          dispatch(addWorkout(workout));
        });
      } catch (error) {
        console.error('Error fetching workouts: ', error);
      }
    };

    if (currentUser) {
      fetchWorkouts();
    }
  }, [currentUser]);

  const startWorkout = (type) => {
    setWorkoutType(type);
    setIsRecording(true);
    const start = Date.now();
    setElapsedTime(0);
    setTimer(
      setInterval(() => {
        setElapsedTime(Date.now() - start);
      }, 1000)
    );
  };

  const handleStop = () => {
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
      const docRef = await addDoc(collection(db, 'workouts'), workoutData);
      console.log('Document written with ID: ', docRef.id);
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

  const resetState = () => {
    setShowConfirmation(false);
    setIsRecording(false);
    setWorkoutType(null);
    setElapsedTime(0);
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
        <div>
          <h2>{workoutType} Workout</h2>
          <p>Elapsed Time: {formatTime(elapsedTime)}</p>
          <button onClick={handleStop}>Stop</button>
        </div>
      )}

      {showConfirmation && (
        <div className='confirmation-dialog'>
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
