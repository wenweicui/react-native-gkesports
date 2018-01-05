/**
 * Created by InforeXuan on 2017/5/18.
 */
import ActionType from '../../actionType';
import {combineReducers} from 'redux';

let key = 1;

function saveTestKey(state = key, action) {
    if (action.type === ActionType.TEST_TYPE) {
        key = action.testKey
    }
    return key
}

let test = combineReducers({
    testKey: saveTestKey,
});

export default test;

