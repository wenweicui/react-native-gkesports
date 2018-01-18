import {combineReducers} from 'redux';
import ActionType from "../../actionType";

let readList = null;// 缓存请求数据
const getReadList = (state = [], action) => {
    if (action.type === ActionType.READ_LIST) {
        console.log(action.data)
        readList  = action.data
        return readList
    }
    return readList
};
let essay = null;// 缓存请求数据
const getEssay = (state = [], action) => {
    if (action.type === ActionType.ESSAY_DETAIL) {
        console.log(action.data)
        essay = action.data
        return essay
    }
    return essay
};

export default combineReducers({
    getReadList,
    getEssay
});

