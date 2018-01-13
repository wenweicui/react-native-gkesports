import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";

let idList = null;// 缓存请求数据
const getIdList = (state = [], action) => {
    if (action.type === Urls.Picture.getIdList) {
        console.log(action.data)
        idList = action.data
        return idList
    }
    return idList
};


export default combineReducers({
    getIdList
});

