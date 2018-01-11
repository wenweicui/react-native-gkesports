import {combineReducers} from 'redux';
import ActionType from "../../actionType";
import {Status} from "../../../../config/api/api.config";

const requestStatus = (state = [], action) => {
    if (action.type === ActionType.REQUEST_STATUS) {
        return action.data
    }
    return Status.SUCCESS
};

export default combineReducers({
    requestStatus
});

