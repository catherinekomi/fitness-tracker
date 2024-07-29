export const ADD_WORKOUT = 'ADD_WORKOUT';

export const addWorkout = (workout) => ({
  type: ADD_WORKOUT,
  payload: workout,
});
