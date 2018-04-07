import { combineReducers } from 'redux';
import trelloReducer from './trelloReducer';

const trelloApp = combineReducers({
    trelloReducer: trelloReducer
})

export default trelloApp;