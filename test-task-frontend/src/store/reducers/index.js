import { combineReducers } from 'redux';
import authReducer from './authReducer';
import employeeReducer from './employeeReducer';


const rootReducer = combineReducers({
    auth:authReducer,
    employees:employeeReducer
});

export default rootReducer;
