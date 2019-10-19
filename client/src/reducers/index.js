import { combineReducers } from 'redux';
import alert from './alert';
import post from './post';

// the name of the reducer that we create
export default combineReducers({
    alert, post
});