import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";

let taskList = []
const getTaskList = (state = [], action) => {
    if (action.type === Urls.Inspections.getTaskList) {
        taskList = action.data
        return taskList
    }
    return taskList
};
let auditList = []
const getAuditList = (state = [], action) => {
    if (action.type === Urls.Audit.getAuditList) {
        auditList = action.data
        return auditList
    }
    return auditList
};

export default combineReducers({
    getTaskList, getAuditList
});

