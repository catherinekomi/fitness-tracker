import { createStore, combineReducers } from 'redux';
import workoutReducer from './reducers/workoutReducer';

const rootReducer = combineReducers({
  workout: workoutReducer,
});

const store = createStore(rootReducer);

export default store;
