import {combineReducers} from 'redux';
import ActionType from "../../actionType";

let idList = null;// 缓存请求数据
const getIdList = (state = [], action) => {
    if (action.type === ActionType.REQUEST_LIST) {
        console.log(action.data)
        idList = action.data
        return idList
    }
    return idList
};
let detail = null;// 缓存请求数据
const getDetail = (state = [], action) => {
    if (action.type === ActionType.REQUEST_DETAIL) {
        console.log(action.data)
        detail = action.data
        return detail
    }
    return detail
};

export default combineReducers({
    getIdList,
    getDetail
});

