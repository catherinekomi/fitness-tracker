import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import './RecordWorkout.css';

const RecordWorkout = () => {
  const { currentUser } = useAuth();

  const [workoutType, setWorkoutType] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [completedWorkout, setCompletedWorkout] = useState(null);

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
    setStartTime(start);
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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
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

    try {
      const docRef = await addDoc(collection(db, 'workouts'), workoutData);
      console.log('Document written with ID: ', docRef.id);
      setWorkouts([workoutData, ...workouts]);
      setCompletedWorkout(workoutData);
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

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className='content'>
      <h1>Record a Workout</h1>
      {!isRecording ? (
        <div className='workout-buttons'>
          <button onClick={() => startWorkout('Run')}>Run</button>
          <button onClick={() => startWorkout('Hike')}>Hike</button>
          <button onClick={() => startWorkout('Walk')}>Walk</button>
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
        <h2>Workout Log</h2>
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
