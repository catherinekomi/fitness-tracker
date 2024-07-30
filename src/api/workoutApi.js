import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export const fetchWorkouts = async (userId) => {
  const q = query(collection(db, 'workouts'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const addNewWorkout = async (workoutData) => {
  const docRef = await addDoc(collection(db, 'workouts'), workoutData);
  return docRef.id;
};
