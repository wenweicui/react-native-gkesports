import {combineReducers} from 'redux';
import Common from './common'
import Picture from './picture'
import Read from './read'

let MainReducer = combineReducers({
    Common,
    Picture,
    Read
});

module.exports = MainReducer;
