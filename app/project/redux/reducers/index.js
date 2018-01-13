import {combineReducers} from 'redux';
import Common from './common'
import Picture from './picture'

let MainReducer = combineReducers({
    Common,
    Picture
});

module.exports = MainReducer;
