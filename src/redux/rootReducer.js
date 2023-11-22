import { combineReducers } from 'redux';
import { getAllData } from './reducer';


const rootReducer = combineReducers({
    getAllData,
  });
  

  export default rootReducer