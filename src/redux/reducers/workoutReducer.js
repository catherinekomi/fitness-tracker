import { ADD_WORKOUT } from '../actions/workoutActions';

const initialState = {
  workouts: [],
};

const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORKOUT:
      return {
        ...state,
        workouts: [action.payload, ...state.workouts],
      };
    default:
      return state;
  }
};

export default workoutReducer;
